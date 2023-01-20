package com.tamnara.backend.api.service;

import com.tamnara.backend.config.jwt.JwtFilter;
import com.tamnara.backend.config.jwt.TokenProvider;
import com.tamnara.backend.db.entity.User;
import com.tamnara.backend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

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
