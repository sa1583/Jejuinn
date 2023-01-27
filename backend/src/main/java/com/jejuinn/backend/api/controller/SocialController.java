package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.db.repository.SocialLoginRepository;
import com.jejuinn.backend.api.service.oauth.KakaoService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.api.service.oauth.NaverService;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@Api(tags = "소셜 로그인 관련 API")
@RequestMapping("/api/users/social")
@RequiredArgsConstructor
public class SocialController {

    private static final String TOKEN_HEADER = "access_token";
    private final UserService userService;
    private final SocialLoginRepository socialLoginRepository;
    private final UserRepository userRepository;
    private final KakaoService kakaoService;
    private final NaverService naverService;
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
        String access_token = request.getHeader(TOKEN_HEADER);

        if(access_token == null) return ResponseEntity.status(400).build();
        logger.debug("KAKAO LOGIN START");
        logger.debug("Access Token : {}", access_token);

        //2. 인증코드로 토큰 전달
        SocialLogin socialInfo = kakaoService.getUserInfoFromKakao(access_token);

        if(socialInfo == null) return ResponseEntity.status(400).build();

        if(userRepository.findOneByEmailAndSocialLogin_Type(socialInfo.getUser().getEmail(), SocialType.valueOf("KAKAO").ordinal()).isEmpty()){
            userRepository.save(socialInfo.getUser());
            socialLoginRepository.save(socialInfo);
        }

        User user = userRepository.findOneByEmailAndSocialLogin_Type(socialInfo.getUser().getEmail(),SocialType.valueOf("KAKAO").ordinal()).get();


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
        User user = naverService.getUserInfoFromNaver(code, state);

        HttpHeaders httpHeaders = userService.getHttpHeaders(user, null);

        return ResponseEntity.status(200).headers(httpHeaders).build();
    }

}
