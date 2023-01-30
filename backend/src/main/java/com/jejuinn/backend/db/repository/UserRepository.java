package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.SocialLogin;
import com.jejuinn.backend.db.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @EntityGraph(attributePaths = "authorities") // 쿼리가 수행될 때 Eager 조회로 authorites 정보를 같이 가져온다.
    Optional<User> findOneWithAuthoritiesByEmail(String email); // username을 기준으로 users 정보와 권한 정보를 같이 가져온다.

    Optional<User> findOneByEmailAndSocialLogin(String email, SocialLogin socialLogin); // 일반 로그인 검색
    Optional<User> findOneByEmailAndSocialLogin_Type(String email, int type); // 소셜 로그인 검색 (email + type)
}
