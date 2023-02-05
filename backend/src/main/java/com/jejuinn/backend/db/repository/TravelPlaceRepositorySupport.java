package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.QTravelPlace;
import com.jejuinn.backend.db.entity.TravelPlace;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TravelPlaceRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    QTravelPlace qTravelPlace = QTravelPlace.travelPlace;

    public Page<TravelPlace> searchTravelPlaceWithFilter(String category, String areaName, String word, Pageable page){
        List<TravelPlace> content = jpaQueryFactory
                .selectFrom(qTravelPlace)
                .where(
                        qTravelPlace.category.eq(category),
                        areaNameEq(areaName),
                        qTravelPlace.name.contains(word)
                )
                .offset(page.getOffset())
                .limit(page.getPageSize())
                .fetch();
        Long count = jpaQueryFactory
                .select(qTravelPlace.count())
                .from(qTravelPlace)
                .where(
                        qTravelPlace.category.eq(category),
                        areaNameEq(areaName),
                        qTravelPlace.name.contains(word)
                )
                .fetchOne();
        return new PageImpl<>(content, page, count);
    }

    private BooleanExpression areaNameEq (String areaName){
        if (areaName.equals("전체")) return null;
        return qTravelPlace.areaName.eq(areaName);
    }
}
