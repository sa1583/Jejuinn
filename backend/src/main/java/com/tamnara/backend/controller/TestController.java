package com.tamnara.backend.controller;

import com.tamnara.backend.config.auth.JwtFilter;
import com.tamnara.backend.config.auth.TokenProvider;
import com.tamnara.backend.dto.request.LoginDto;
import com.tamnara.backend.dto.response.TokenDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.http.HttpServletRequest;
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
        httpHeaders.add(JwtFilter.ACCESS_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto("Bearer " + jwt), httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/auth/test")
    public ResponseEntity<?> test(HttpServletRequest request){
        String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
        Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
        System.out.println("=============================================");
        System.out.println("getCredentials");
        System.out.println(authentication.getCredentials());
        System.out.println("getPrincipal");
        System.out.println(authentication.getPrincipal());
        System.out.println("authorities");
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            System.out.println(authority.toString());
        }
        System.out.println("=============================================");
        return new ResponseEntity<String>(accessToken, HttpStatus.ACCEPTED);
    }
}
