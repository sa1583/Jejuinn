package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.QUser;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class UserRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;

    @Transactional
    public void saveRefreshToken(long userUid,String refreshToken){
        jpaQueryFactory
                .update(qUser)
                .set(qUser.refreshToken, refreshToken)
                .where(qUser.uid.eq(userUid))
                .execute();
    }
}
