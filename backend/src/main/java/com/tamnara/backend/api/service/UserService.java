package com.tamnara.backend.api.service;

import com.tamnara.backend.api.dto.request.SignupPostReq;
import com.tamnara.backend.config.jwt.JwtFilter;
import com.tamnara.backend.config.jwt.TokenProvider;
import com.tamnara.backend.db.entity.Authority;
import com.tamnara.backend.db.entity.User;
import com.tamnara.backend.db.repository.UserRepository;
import com.tamnara.backend.exception.DuplicateMemberException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Transactional
    public User signup(SignupPostReq userRegisterPostReq) {

        if(userRepository.findOneByEmailAndSocialLogin(userRegisterPostReq.getEmail(), null).orElse(null) != null){
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        return User.builder()
                .email(userRegisterPostReq.getEmail())
                .emailReceiveAllow(userRegisterPostReq.isEmailReceiveAllow())
                .nickname(userRegisterPostReq.getNickname())
                .password(passwordEncoder.encode(userRegisterPostReq.getPassword()))
                .authorities(Collections.singleton(authority))
                .build();
    }

    @Transactional
    public User saveRefreshToken(String refreshToken, User user){
        user.setRefreshToken(refreshToken);
        logger.info("save this : {}", user);
        return userRepository.save(user);
    }

    public HttpHeaders getHttpHeaders(User user, String token) {
        System.out.println("엥?");
        String accessToken = tokenProvider.createAccessToken(user);
        System.out.println("hihihihih");
        String refreshToken = token;
        if(refreshToken == null){
            refreshToken = tokenProvider.createRefreshToken(user);
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.ACCESS_HEADER, "Bearer " + accessToken);
        httpHeaders.add(JwtFilter.REFRESH_HEADER, "Bearer " + refreshToken);

        saveRefreshToken(refreshToken, user);

        return httpHeaders;
    }
}
