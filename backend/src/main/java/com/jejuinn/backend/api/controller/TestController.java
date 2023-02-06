package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.TestReq;
import com.jejuinn.backend.api.service.s3.S3Uploader;
import com.jejuinn.backend.config.jwt.JwtFilter;
import com.jejuinn.backend.config.jwt.TokenProvider;
import com.jejuinn.backend.db.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
@Api(tags = "테스트 API")
//@RequestMapping("/api")
public class TestController {
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final S3Uploader s3Uploader;

    @GetMapping("/api/test")
    @ApiOperation(value = "헤더 반환 테스트")
    public ResponseEntity<?> test2(){
        System.out.println(Paths.get(System.getProperty("user.home"), ".kurento","config.properties"));
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("yutae", "999");
        return ResponseEntity.status(200).headers(httpHeaders).body("hello");
    }

    @PostMapping("/api/test3")
    @ApiOperation(value = "JSON 입력 테스트")
    public ResponseEntity<?> test3(@RequestBody TestReq testReq){
        return ResponseEntity.status(200).body(testReq.getMsg());
    }

    @GetMapping("/auth/test")
    @ApiOperation(value = "auth 정보 테스트")
    public ResponseEntity<?> test(HttpServletRequest request){
        String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
        Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
        String uid = authentication.getName();
        System.out.println(userRepository.findById(Long.parseLong(uid)));
        System.out.println("=============================================");
        System.out.println("getCredentials");
        System.out.println(authentication.getCredentials());
        System.out.println("getPrincipal");
        System.out.println(authentication.getName());
        System.out.println(authentication.getPrincipal());
        System.out.println("authorities");
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            System.out.println(authority.toString());
        }
        System.out.println("=============================================");
        return ResponseEntity.status(200).build();
    }
}
