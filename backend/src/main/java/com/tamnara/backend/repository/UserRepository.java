package com.tamnara.backend.repository;

import com.tamnara.backend.entity.Users;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    @EntityGraph(attributePaths = "authorities") // 쿼리가 수행될 때 Eager 조회로 authorites 정보를 같이 가져온다.
    Optional<Users> findOneWithAuthoritiesByUsername(String username); // username을 기준으로 users 정보와 권한 정보를 같이 가져온다.
}
