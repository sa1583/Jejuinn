package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.QTravelPlace;
import com.jejuinn.backend.db.entity.TravelPlace;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class TravelPlaceRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    QTravelPlace qTravelPlace = QTravelPlace.travelPlace;

    public Page<TravelPlace> searchTravelPlaceWithFilter(String category, String areaName, String word, Pageable page){
        List<TravelPlace> content = jpaQueryFactory
                .selectFrom(qTravelPlace)
                .where(
                        categoryEq(category),
                        areaNameEq(areaName),
                        nameEq(word)
                )
                .offset(page.getOffset())
                .limit(page.getPageSize())
                .fetch();
        Long count = jpaQueryFactory
                .select(qTravelPlace.count())
                .from(qTravelPlace)
                .where(
                        categoryEq(category),
                        areaNameEq(areaName),
                        nameEq(word)
                )
                .fetchOne();
        return new PageImpl<>(content, page, count);
    }

    private BooleanExpression areaNameEq (String areaName){
        if (areaName.equals("전체")) return null;
        return qTravelPlace.areaName.eq(areaName);
    }

    private BooleanExpression categoryEq (String category){
        if (category.equals("전체")) return null;
        return qTravelPlace.category.eq(category);
    }

    private BooleanExpression nameEq (String name){
        if (name == null || name.equals("") || name.equals(" ")) return null;
        return qTravelPlace.name.contains(name);
    }
}
