package com.tamnara.backend.api.controller;

import com.tamnara.backend.config.jwt.JwtFilter;
import com.tamnara.backend.config.jwt.TokenProvider;
import com.tamnara.backend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
//@RequestMapping("/api")
public class TestController {
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;

    @GetMapping("/auth/test")
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
