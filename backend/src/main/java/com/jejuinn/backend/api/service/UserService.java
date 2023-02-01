package com.jejuinn.backend.api.service;

import com.jejuinn.backend.api.dto.request.SignupPostReq;
import com.jejuinn.backend.db.entity.Authority;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.db.repository.UserRepositorySupport;
import com.jejuinn.backend.exception.DuplicateMemberException;
import com.jejuinn.backend.config.jwt.JwtFilter;
import com.jejuinn.backend.config.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserRepositorySupport userRepositorySupport;
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
                .nickname(userRegisterPostReq.getNickname())
                .password(passwordEncoder.encode(userRegisterPostReq.getPassword()))
                .authorities(Collections.singleton(authority))
                .build();
    }

//    @Transactional
//    public User saveRefreshToken(String refreshToken, User user){
//        user.setRefreshToken(refreshToken);
//        logger.info("save this : {}", user);
//        return userRepository.save(user);
//    }

    public HttpHeaders getHttpHeaders(User user, String token) {

        String accessToken = tokenProvider.createAccessToken(user);

        String refreshToken = token;
        if(refreshToken == null){
            refreshToken = tokenProvider.createRefreshToken(user);
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.ACCESS_HEADER, "Bearer " + accessToken);
        httpHeaders.add(JwtFilter.REFRESH_HEADER, "Bearer " + refreshToken);

        logger.info("ACCESS : {}",accessToken);
        logger.info("REFRESH : {}", refreshToken);

        userRepositorySupport.saveRefreshToken(user.getUid(), refreshToken);

        return httpHeaders;
    }

    public Long getUserUidFromAccessToken(HttpServletRequest request){
        String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
        Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
        String uid = authentication.getName();
        if(uid == null) return null;
        return Long.parseLong(uid);
    }
}
