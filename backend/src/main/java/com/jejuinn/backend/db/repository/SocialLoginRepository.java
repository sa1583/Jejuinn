package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.SocialLogin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SocialLoginRepository extends JpaRepository<SocialLogin, Long> {
    Optional<SocialLogin> findOneByUser_Uid(Long user_uid);
}
