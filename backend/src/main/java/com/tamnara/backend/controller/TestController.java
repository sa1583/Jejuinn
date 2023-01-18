package com.tamnara.backend.controller;

import com.tamnara.backend.config.auth.JwtFilter;
import com.tamnara.backend.config.auth.TokenProvider;
import com.tamnara.backend.dto.request.LoginDto;
import com.tamnara.backend.dto.response.TokenDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.validation.Valid;

@RestController
//@RequestMapping("/api")
public class TestController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public TestController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken); // CustomUserDetailsService.loadUserByUsername 실행 시점

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto("Bearer " + jwt), httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/auth/test")
    public String test(){
        return "hi";
    }
}
