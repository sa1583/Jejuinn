package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.SocialLogin;
import com.jejuinn.backend.db.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @EntityGraph(attributePaths = "authorities") // 쿼리가 수행될 때 Eager 조회로 authorites 정보를 같이 가져온다.
    Optional<User> findOneWithAuthoritiesByEmail(String email); // username을 기준으로 users 정보와 권한 정보를 같이 가져온다.

    Optional<User> findOneByEmailAndSocialLogin(String email, SocialLogin socialLogin); // 일반 로그인 검색

    Optional<User> findOneByEmailAndSocialLogin_Type(String email, int type); // 소셜 로그인 검색 (email + type)

    Optional<User> findById(Long userUid);

    @Query(value = "select k.recruitment_uid from users u right outer join resume_infos r on u.uid = r.user_uid " +
            "right outer join work_resume_info_join w on r.uid = w.resume_info_uid " +
            "right outer join works k on w.work_uid = k.uid where u.uid = :userUid", nativeQuery = true)
    List<Long> findRecruitmentUidByUserUid(@Param("userUid") Long userUid);

}
