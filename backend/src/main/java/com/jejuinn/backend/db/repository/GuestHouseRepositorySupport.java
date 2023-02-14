package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.entity.QGuestHouse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

    public Page<GuestHouse> searchGuestHouseWithFilter(List<String> tags, String areaName, String word, Pageable pageable) {
        List<GuestHouse> guestHouseList = jpaQueryFactory
                .selectFrom(qGuestHouse)
                .where(
                        tagsContain(tags),
                        areaNameEq(areaName),
                        guestHouseNameContain(word)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        Long count = jpaQueryFactory.select(qGuestHouse.count())
                .from(qGuestHouse)
                .where(
                        tagsContain(tags),
                        areaNameEq(areaName),
                        guestHouseNameContain(word)
                ).fetchOne();
        return new PageImpl<>(guestHouseList, pageable, count);
    }

    public List<Long> searchGuestHouseUidWithFilter(List<String> tags, String areaName, String word) {
        List<Long> guestHouseUidList = jpaQueryFactory
                .select(qGuestHouse.uid)
                .from(qGuestHouse)
                .where(
                        tagsContain(tags),
                        areaNameEq(areaName),
                        guestHouseNameContain(word)
                ).fetch();
        return guestHouseUidList;
    }

    private BooleanExpression areaNameEq(String areaName) {
        if(areaName.equals("전체") || areaName.equals(("")) || areaName == null) return null;
        return qGuestHouse.area.areaName.eq(areaName);
    }

    private BooleanBuilder tagsContain(List<String> tags) {
        System.out.println("여기로 옴");
        BooleanBuilder builder = new BooleanBuilder();
        for (String tag : tags) {
            if(tag.equals(("")) || tag == null) continue;
            builder.and(qGuestHouse.tags.contains(tag));
        }
        return builder;
    }



    private BooleanExpression guestHouseNameContain(String guestHouseName) {
        if(guestHouseName.equals("") || guestHouseName == null) return null;
        return qGuestHouse.guestHouseName.contains(guestHouseName);
    }
}
