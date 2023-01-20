package com.tamnara.backend.api.service;

import com.tamnara.backend.db.entity.User;
import com.tamnara.backend.db.repository.UserRepository;
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
