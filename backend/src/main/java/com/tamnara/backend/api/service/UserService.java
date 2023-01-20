package com.tamnara.backend.api.service;

import com.tamnara.backend.api.dto.request.SignupPostReq;
import com.tamnara.backend.config.jwt.JwtFilter;
import com.tamnara.backend.config.jwt.TokenProvider;
import com.tamnara.backend.db.entity.Authority;
import com.tamnara.backend.db.entity.User;
import com.tamnara.backend.db.repository.UserRepository;
import com.tamnara.backend.exception.DuplicateMemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    public User signup(SignupPostReq userRegisterPostReq) {

        if(userRepository.findOneByEmailAndSocialLogin(userRegisterPostReq.getEmail(), null).orElse(null) != null){
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .email(userRegisterPostReq.getEmail())
                .emailReceiveAllow(userRegisterPostReq.isEmailReceiveAllow())
                .nickname(userRegisterPostReq.getNickname())
                .password(passwordEncoder.encode(userRegisterPostReq.getPassword()))
                .authorities(Collections.singleton(authority))
                .build();

        return userRepository.save(user);
    }

    @Transactional
    public User saveRefreshToken(String refreshToken, User user){
        user.setRefreshToken(refreshToken);
        return userRepository.save(user);
    }

    public HttpHeaders getHttpHeaders(Optional<User> user) {
        String accessToken = tokenProvider.createAccessToken(user.get());
        String refreshToken = tokenProvider.createRefreshToken(user.get());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.ACCESS_HEADER, "Bearer " + accessToken);
        httpHeaders.add(JwtFilter.REFRESH_HEADER, "Bearer " + refreshToken);

        this.saveRefreshToken(refreshToken, user.get());

        return httpHeaders;
    }
}
