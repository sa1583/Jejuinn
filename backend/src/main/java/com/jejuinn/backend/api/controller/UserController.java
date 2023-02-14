package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.user.ChangePwReq;
import com.jejuinn.backend.api.dto.request.user.LoginPostReq;
import com.jejuinn.backend.api.dto.request.user.SimpleEmailReq;
import com.jejuinn.backend.api.dto.response.user.GetUserInfoPostRes;
import com.jejuinn.backend.api.dto.request.user.SignupPostReq;
import com.jejuinn.backend.api.dto.response.user.SimpleCodeRes;
import com.jejuinn.backend.api.service.EmailService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.config.jwt.JwtFilter;
import com.jejuinn.backend.config.jwt.TokenProvider;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.db.repository.UserRepositorySupport;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Enumeration;
import java.util.Optional;

@RestController
@Api(tags = "회원 관련 기능 API")
@RequiredArgsConstructor
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final UserRepositorySupport userRepositorySupport;
    private final UserService userService;
    private final EmailService emailService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

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
            @ApiParam(value = "email, password, nickname")
            @Valid @RequestBody SignupPostReq userRegisterPostReq){

        // email로 social 로그인이 아닌 user 가져오기
        User user = userService.signup(userRegisterPostReq);

        HttpHeaders httpHeaders = userService.getHttpHeaders(user, null);

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

        if(user.isEmpty() || !passwordEncoder.matches(loginPostReq.getPassword(), user.get().getPassword())){
            logger.info("로그인 실패 : 아이디 일치 여부 = {}", user.isEmpty());
            return ResponseEntity.status(400).build();
        }

        HttpHeaders httpHeaders = userService.getHttpHeaders(user.get(), null);

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
        logger.info(" CALL : GET USER INFO");
        String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
        Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
        String uid = authentication.getName();
        Optional<User> user = userRepository.findById(Long.parseLong(uid));

        // 검색 결과가 없다면
        if(user.isEmpty()) return ResponseEntity.status(401).build();
//        logger.info(" RESPONSE USER iNFO {} ", user.get());
        return ResponseEntity.status(200).body(GetUserInfoPostRes.from(user.get()));
    }

    /**
     * Refresh Token을 통한 Access 토큰 재발급
     * @return
     */
    @PostMapping("/api/users/refresh")
    @ApiOperation(value = "Access 토큰 재발급", notes = "<strong>헤더의 refresh 토큰 정보</strong>를 통해 access 토큰을 재발급한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Access Token 재발급 성공"),
            @ApiResponse(code = 400, message = "기타 오류"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(재발급 실패, 로그아웃)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request){

        Enumeration<String> headerNames = request.getHeaderNames();

        if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                System.out.println("Header: " + request.getHeader(headerNames.nextElement()));
            }
        }

        String refreshToken = request.getHeader(JwtFilter.REFRESH_HEADER);
        logger.info("리프레시 토큰 : {}", refreshToken);
        Authentication authentication = tokenProvider.getAuthentication(refreshToken.substring(7));
        String uid = authentication.getName();
        Optional<User> user = userRepository.findById(Long.parseLong(uid));
        logger.info("현재 사용자 uid : {}", user.get().getUid());

        if(user.isEmpty() // 검색 결과가 없거나
                || !tokenProvider.validateToken(refreshToken.substring(7)) // refresh 토큰이 유효하지 않거나
                || !user.get().getRefreshToken().equals(refreshToken.substring(7))) // refresh 토큰이 동일하지 않다면
            return ResponseEntity.status(401).build();

        logger.info("재발급 하러 갑시다 ");
        HttpHeaders httpHeaders = userService.getHttpHeaders(user.get(), refreshToken.substring(7)); // access 토큰만 재발급

        return ResponseEntity.status(200).headers(httpHeaders).build();
    }

    /**
     *
     * @param simpleEmailReq
     * @return
     */

    @PostMapping("/api/users/email-check")
    @ApiOperation(value = "이메일 중복 확인", notes = "<strong>이메일 텍스트</strong>를 받아 중복 여부를 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(중복되지 않는 이메일)"),
            @ApiResponse(code = 409, message = "Conflict(중복되는 이메일)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> checkDuplicateEmail(@Valid @RequestBody SimpleEmailReq simpleEmailReq){
        if(userRepository.findOneByEmailAndSocialLogin(simpleEmailReq.getEmail(), null).isEmpty()){
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(409).build();
    }

    /**
     *
     * @param uid
     * @return
     */

    @PostMapping("/auth/users/logout/{uid}")
    @ApiOperation(value = "로그아웃", notes = "<string>사용자의 uid를 입력받아</strong> 해당 사용자를 로그아웃처리 합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(로그아웃 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(로그아웃 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> logout(@PathVariable Long uid){
        userRepositorySupport.saveRefreshToken(uid, null);
        return ResponseEntity.status(200).build();
    }

    /**
     *
     * @param simpleEmailReq
     * @return simpleCodeRes
     */

    @PostMapping("/api/users/pw/reset")
    @ApiOperation(value = "비밀번호 재설정을 위한 인증코드 발급", notes = "<string>이메일</strong>을 입력받아 사용자 여부를 확인 후, 해당 사용자의 비밀번호 재설정을 위한 코드를 입력받은 이메일로 보냅니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(비밀번호 초키화 코드를 email로 발급)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(존재하지 않는 이메일)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(메일 전송 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getPasswordResetCode(@Valid @RequestBody SimpleEmailReq simpleEmailReq){
        Optional<User> user = userRepository.findOneByEmailAndSocialLogin(simpleEmailReq.getEmail(), null);
        if(!user.isPresent()){
            return ResponseEntity.status(400).build();
        }

        SimpleCodeRes res;
        try {
            res = SimpleCodeRes.builder()
                    .code(emailService.sendMessage(simpleEmailReq.getEmail()))
                    .userUid(user.get().getUid())
                    .build();
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.status(200).body(res);
    }

    /**
     *현
     * @param request
     * @return
     */

    @PostMapping("/auth/users/pw/check")
    @ApiOperation(value = "개인정보 수정 페이지로 이등 시 비밀번호 확인", notes = "<string>비밀번호</strong>를 입력받아 일치하는지 확인합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(비밀번호 일치)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(비밀번호 불일치)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> checkPassword(HttpServletRequest request){
        String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
        Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
        String uid = authentication.getName();
        Optional<User> user = userRepository.findById(Long.parseLong(uid));
        if(user.isEmpty()
                ||passwordEncoder.matches(request.getHeader("password"), user.get().getPassword()))
            return ResponseEntity.status(400).build();

        return ResponseEntity.status(200).build();
    }

    @PostMapping("/api/users/pw-change")
    @ApiOperation(value = "비밀번호 변경", notes = "비밀번호<를 입력받아 입력받은 비밀번호 변경합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(비밀번호 변경 완료)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> changePassword(@RequestBody ChangePwReq changePwReq){
        Optional<User> user = userRepository.findById(changePwReq.getUserUid());
        if(user.isPresent()) {
            user.get().setPassword(passwordEncoder.encode(changePwReq.getPassword()));
            userRepository.save(user.get());
        }
        return ResponseEntity.status(200).build();
    }

}
