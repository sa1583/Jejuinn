package com.tamnara.backend.api.controller;

import com.tamnara.backend.api.dto.request.LoginPostReq;
import com.tamnara.backend.api.dto.request.SignupPostReq;
import com.tamnara.backend.api.dto.response.GetUserInfoPostRes;
import com.tamnara.backend.api.service.UserService;
import com.tamnara.backend.config.jwt.JwtFilter;
import com.tamnara.backend.config.jwt.TokenProvider;
import com.tamnara.backend.db.entity.User;
import com.tamnara.backend.db.repository.UserRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@Api(tags = "회원 관련 기능 API")
@RequiredArgsConstructor
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final UserService userService;

    /**
     * 회원가입 및 JWT 발급
     * @param userRegisterPostReq {userId, password, nickname, email, emailReceiveAllow}
     * @return
     */
    @PostMapping("/api/users")
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디, 패스워드, 닉네임, 이메일, 이메일 수신동의 여부</strong>을 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 가입 성공"),
            @ApiResponse(code = 400, message = "BAD REQUEST(기타 에러) : check validity of RequestBody"),
            @ApiResponse(code = 409, message = "CONFLICT(ID, Email 등 중복 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> signUp(
            @ApiParam(value = "userId, password, nickname, email, emailReceiveAllow")
            @Valid @RequestBody SignupPostReq userRegisterPostReq){

        // email로 social 로그인이 아닌 user 가져오기
        User user = userService.signup(userRegisterPostReq);

        HttpHeaders httpHeaders = userService.getHttpHeaders(user);

        return ResponseEntity.status(200).headers(httpHeaders).build();
    }

    /**
     * 회원가입 및 JWT 발급
     * @param loginPostReq {email, password}
     * @return
     */
    @PostMapping("/api/users/login")
    @ApiOperation(value = "로그인", notes = "<strong>이메일, 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 400, message = "BAD REQUEST(로그인 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> login(
            @ApiParam(value = "email, password")
            @Valid @RequestBody LoginPostReq loginPostReq){

        // email로 social 로그인이 아닌 user 가져오기
        Optional<User> user = userRepository.findOneByEmailAndSocialLogin(loginPostReq.getEmail(), null);

        // 해당 email의 아이디가 없거나 패스워드가 다른 경우
        if(user.isEmpty() || !passwordEncoder.matches(loginPostReq.getPassword(), user.get().getPassword())){
            return ResponseEntity.status(400).build();
        }

        HttpHeaders httpHeaders = userService.getHttpHeaders(user.get());

        return ResponseEntity.status(200).headers(httpHeaders).build();
    }

    /**
     * Access Token을 통한 회원정보 조회
     * @return
     */
    @PostMapping("/auth/users")
    @ApiOperation(value = "회원정보 조회", notes = "<strong>헤더의 엑세스토큰 정보</strong>를 통해 회원정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(정보조회 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getUserInfo(HttpServletRequest request){
        String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
        Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
        String uid = authentication.getName();
        Optional<User> user = userRepository.findById(Long.parseLong(uid));

        // 검색 결과가 없다면
        if(user.isEmpty()) return ResponseEntity.status(401).build();

        return ResponseEntity.status(200).body(GetUserInfoPostRes.from(user.get()));
    }

    /**
     * Refresh Token을 통한 Access 토큰 재발급
     * @return
     */
    @PostMapping("/auth/users")
    @ApiOperation(value = "Access 토큰 재발급", notes = "<strong>헤더의 refresh 토큰 정보</strong>를 통해 access 토큰을 재발급한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(정보조회 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request){
        String refreshToken = request.getHeader(JwtFilter.REFRESH_HEADER);
        Authentication authentication = tokenProvider.getAuthentication(refreshToken.substring(7));
        String uid = authentication.getName();
        Optional<User> user = userRepository.findById(Long.parseLong(uid));


        if(user.isEmpty() // 검색 결과가 없거나
                || !tokenProvider.validateToken(refreshToken) // refresh 토큰이 유효하지 않거나
                || !user.get().getRefreshToken().equals(refreshToken)) // refresh 토큰이 동일하지 않다면
            return ResponseEntity.status(401).build();

        String accessToken = tokenProvider.createAccessToken(user.get());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.ACCESS_HEADER, "Bearer " + accessToken);

        return ResponseEntity.status(200).headers(httpHeaders).build();
    }


}
