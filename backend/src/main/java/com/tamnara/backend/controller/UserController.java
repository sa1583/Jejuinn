package com.tamnara.backend.controller;

import com.tamnara.backend.config.jwt.JwtFilter;
import com.tamnara.backend.config.jwt.TokenProvider;
import com.tamnara.backend.dto.request.LoginPostReq;
import com.tamnara.backend.dto.request.SignupPostReq;
import com.tamnara.backend.entity.User;
import com.tamnara.backend.repository.UserRepository;
import com.tamnara.backend.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api")
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
    @PostMapping("/users")
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
        System.out.println(userRegisterPostReq);
        return null;
    }

    /**
     * 회원가입 및 JWT 발급
     * @param loginPostReq {email, password}
     * @return
     */
    @PostMapping("/users/login")
    @ApiOperation(value = "로그인", notes = "<strong>이메일, 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 400, message = "BAD REQUEST(로그인 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> login(
            @ApiParam(value = "email, password")
            @Valid @RequestBody LoginPostReq loginPostReq){

        Optional<User> user = userRepository.findOneWithAuthoritiesByEmail(loginPostReq.getEmail());

        // 해당 email의 아이디가 없거나 패스워드가 다른 경우
        if(user.isEmpty() || !passwordEncoder.matches(loginPostReq.getPassword(), user.get().getPassword())){
            return ResponseEntity.status(400).build();
        }

        String accessToken = tokenProvider.createAccessToken(user.get());
        String refreshToken = tokenProvider.createRefreshToken(user.get());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.ACCESS_HEADER, "Bearer " + accessToken);
        httpHeaders.add(JwtFilter.REFRESH_HEADER, "Bearer " + refreshToken);

        userService.saveRefreshToken(refreshToken, user.get());


        System.out.println(httpHeaders.get(JwtFilter.REFRESH_HEADER));

        return ResponseEntity.status(200).headers(httpHeaders).build();
    }
}