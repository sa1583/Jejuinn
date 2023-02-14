package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.service.social.GoogleService;
import com.jejuinn.backend.config.jwt.JwtFilter;
import com.jejuinn.backend.config.jwt.TokenProvider;
import com.jejuinn.backend.db.repository.SocialLoginRepository;
import com.jejuinn.backend.api.service.social.KakaoService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.api.service.social.NaverService;
import com.jejuinn.backend.db.entity.SocialLogin;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.enums.SocialType;
import com.jejuinn.backend.db.repository.UserRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@Api(tags = "소셜 로그인 관련 API")
@RequestMapping("/api/users/social")
@RequiredArgsConstructor
public class SocialController {

    private static final String TOKEN_HEADER = "socialToken";
    private final UserService userService;
    private final SocialLoginRepository socialLoginRepository;
    private final UserRepository userRepository;
    private final KakaoService kakaoService;
    private final NaverService naverService;
    private final GoogleService googleService;
    private final TokenProvider tokenProvider;
    private static final Logger logger = LoggerFactory.getLogger(SocialController.class);

    /**
     * 카카오 로그인 및 JWT 발급
     * @return
     */
    @PostMapping("/kakao")
    @ApiOperation(value = "카카오 로그인", notes = "<strong>OAuth2.0 access_token</strong>을 통해 카카오 소셜 로그인을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 가입 성공"),
            @ApiResponse(code = 400, message = "BAD REQUEST(소셜 로그인 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> kakaoLogin(HttpServletRequest request){

        //1. 코드전달
        logger.info("KAKAO LOGIN START");
        String access_token = request.getHeader(TOKEN_HEADER);

        if(access_token == null) return ResponseEntity.status(400).build();

        logger.info("Access Token : {}", access_token);

        //2. 인증코드로 토큰 전달
        SocialLogin socialInfo = kakaoService.getUserInfoFromKakao(access_token.substring(7));

        if(socialInfo == null) return ResponseEntity.status(400).build();

        if(userRepository.findOneByEmailAndSocialLogin_Type(socialInfo.getUser().getEmail(), SocialType.valueOf("KAKAO").ordinal()).isEmpty()){
            userRepository.save(socialInfo.getUser());
            socialLoginRepository.save(socialInfo);
        }

        User user = userRepository.findOneByEmailAndSocialLogin_Type(socialInfo.getUser().getEmail(),SocialType.valueOf("KAKAO").ordinal()).get();

        logger.info("User info : {}", user);

        HttpHeaders httpHeaders = userService.getHttpHeaders(user, null);

        return ResponseEntity.status(200).headers(httpHeaders).build();
    }


    /**
     * 네이버 로그인 및 JWT 발급
     * @return
     */
    @PostMapping("/naver")
    @ApiOperation(value = "네이버 로그인", notes = "<strong>OAuth2.0 access_token을 통해</strong>를 통해 네이버 소셜 로그인을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 가입 성공"),
            @ApiResponse(code = 400, message = "BAD REQUEST(소셜 로그인 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> NaverLogin(HttpServletRequest request){

        //1. 코드전달
        String code = request.getHeader(TOKEN_HEADER);
        String state = request.getHeader("state");

        if(code == null || state == null) return ResponseEntity.status(400).build();

        //2. 인증코드로 토큰 전달
        User user = naverService.getUserInfoFromNaver(code.substring(7));

        HttpHeaders httpHeaders = userService.getHttpHeaders(user, null);

        return ResponseEntity.status(200).headers(httpHeaders).build();
    }

    /**
     * 구글 로그인 및 JWT 발급
     * @return
     */
    @PostMapping("/google")
    @ApiOperation(value = "구글 로그인", notes = "<strong>OAuth2.0 access-token을 통해</strong> 구글 소셜 로그인을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 가입 성공"),
            @ApiResponse(code = 400, message = "BAD REQUEST(소셜 로그인 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> GoogleLogin(HttpServletRequest request) {
        // 1. 코드 전달
        String access_token = request.getHeader(TOKEN_HEADER);
        if(access_token == null) return ResponseEntity.status(400).build();
        logger.info("Google LOGIN START");
        logger.info("Access Token : {}", access_token);

        //2. 인증코드로 토큰 전달
        SocialLogin socialInfo = googleService.getUserInfoFromGoogle(access_token);

        if(socialInfo == null) return ResponseEntity.status(400).build();

        if(userRepository.findOneByEmailAndSocialLogin_Type(socialInfo.getUser().getEmail(), SocialType.valueOf("GOOGLE").ordinal()).isEmpty()){
            userRepository.save(socialInfo.getUser());
            socialLoginRepository.save(socialInfo);
        }

        User user = userRepository.findOneByEmailAndSocialLogin_Type(socialInfo.getUser().getEmail(),SocialType.valueOf("GOOGLE").ordinal()).get();

        HttpHeaders httpHeaders = userService.getHttpHeaders(user, null);

        return ResponseEntity.status(200).headers(httpHeaders).build();
    }

    @PostMapping("/auth/users/naver-auth")
    @ApiOperation(value = "네이버 인증", notes = "<strong>사용자의 네이버 정보</strong>를 받아 인증 계정으로 전환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(인증 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(기타 오류)"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED(인증 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getNaverAuth(HttpServletRequest request){
        String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
        logger.info("accessToken : {}", accessToken);
        Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
        String uid = authentication.getName();
        logger.info("uid : {}", uid);

        Optional<User> user = userRepository.findById(Long.parseLong(uid));
        logger.info("userUid : {}", user.get().getUid());
        if (user.isEmpty()) return ResponseEntity.status(400).build();
        logger.info("유저의 이름은 : {}", user.get().getNickname());
        naverService.myUserInfoFromNaver(request.getHeader(TOKEN_HEADER).substring(7), userService.getUserUidFromAccessToken(request));

        return ResponseEntity.status(200).build();
    }
}
