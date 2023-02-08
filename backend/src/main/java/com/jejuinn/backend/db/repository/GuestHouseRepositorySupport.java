package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.entity.QGuestHouse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GuestHouseRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    QGuestHouse qGuestHouse = QGuestHouse.guestHouse;

    @Transactional
    public List<GuestHouse> getGuestHouseList(int offset, int limit){
        return jpaQueryFactory
                .selectFrom(qGuestHouse)
                .offset(offset)
                .limit(limit)
                .fetch();
    }
}
