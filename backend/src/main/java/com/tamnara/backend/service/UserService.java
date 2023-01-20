package com.tamnara.backend.service;

import com.tamnara.backend.entity.User;
import com.tamnara.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public User saveRefreshToken(String refreshToken, User user){
        user.setRefreshToken(refreshToken);
        return userRepository.save(user);
    }
}
