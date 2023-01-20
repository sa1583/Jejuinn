package com.tamnara.backend.api.controller;

import com.tamnara.backend.config.jwt.JwtFilter;
import com.tamnara.backend.config.jwt.TokenProvider;
import com.tamnara.backend.api.dto.request.LoginPostReq;
import com.tamnara.backend.api.dto.response.TokenDto;
import com.tamnara.backend.db.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
//@RequestMapping("/api")
public class TestController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;

    public TestController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder,
                          UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userRepository = userRepository;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginPostReq loginDto) {
//        UsernamePasswordAuthenticationToken authenticationToken =
//                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
//
//        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken); // CustomUserDetailsService.loadUserByUsername 실행 시점
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        String jwt = tokenProvider.createToken(authentication);
//
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.add(JwtFilter.ACCESS_HEADER, "Bearer " + jwt);
//
//        return new ResponseEntity<>(new TokenDto("Bearer " + jwt), httpHeaders, HttpStatus.OK);
        return null;
    }

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
