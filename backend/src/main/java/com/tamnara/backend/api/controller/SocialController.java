package com.tamnara.backend.api.controller;

import com.tamnara.backend.api.dto.request.SignupPostReq;
import com.tamnara.backend.api.service.SocialService;
import com.tamnara.backend.api.service.UserService;
import com.tamnara.backend.config.jwt.JwtFilter;
import com.tamnara.backend.config.jwt.TokenProvider;
import com.tamnara.backend.db.entity.User;
import com.tamnara.backend.db.repository.UserRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

@RestController
@Api(tags = "소셜 로그인 관련 API")
@RequestMapping("/api/users/social")
@RequiredArgsConstructor
public class SocialController {

    private static final String TOKEN_HEADER = "access_token";
    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final SocialService socialService;

    /**
     * 카카오 로그인 및 JWT 발급
     * @return
     */
    @PostMapping("/kakao")
    @ApiOperation(value = "카카오 로그인", notes = "<strong>Authorization 코드</strong>를 통해 카카오 소셜 로그인을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 가입 성공"),
            @ApiResponse(code = 400, message = "BAD REQUEST(소셜 로그인 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> kakaoLogin(HttpServletRequest request){
        System.out.println(request.getHeader(TOKEN_HEADER));

        //1. 코드전달
        String access_token = request.getHeader(TOKEN_HEADER);
//        System.out.println(access_token);

        if(access_token == null) return ResponseEntity.status(400).build();

        //2. 인증코드로 토큰 전달
        HashMap<String, String> userInfoMap = socialService.getUserInfo(access_token);

        String accessToken ="", refreshToken = "";

        if(userInfoMap == null) return ResponseEntity.status(400).build();

        if(userRepository.findOneByEmailAndSocialLogin_Type(userInfoMap.get("email"), 0).isEmpty()){
            System.out.println("회원가입~ 가자");
            System.out.println(userInfoMap.get("email"));
            System.out.println(userInfoMap.get("name"));
        }

        HttpHeaders httpHeaders = userService.getHttpHeaders(User.builder()
                .uid(3L)
                .email(userInfoMap.get("email"))
                .nickname(userInfoMap.get("name"))
                .build(), null);
        System.out.println("???");
        return ResponseEntity.status(200).headers(httpHeaders).build();
    }

}
