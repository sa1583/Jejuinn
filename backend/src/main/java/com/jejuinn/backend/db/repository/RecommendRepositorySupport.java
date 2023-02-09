package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.dto.recommend.QRecommendWorkDto;
import com.jejuinn.backend.api.dto.recommend.RecommendWorkDto;
import com.jejuinn.backend.db.entity.QGuestHouse;
import com.jejuinn.backend.db.entity.QTravelPlace;
import com.jejuinn.backend.db.entity.QWork;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RecommendRepositorySupport {

    private final JPAQueryFactory factory;
    QWork qWork = QWork.work;
    QGuestHouse qGuestHouse = QGuestHouse.guestHouse;

    public RecommendWorkDto getWorkInfo(Long workUid){
        factory.select(new QRecommendWorkDto(
                        qWork.workName,
                qWork.gender

                ))
                .from(qWork)
                .join(qGuestHouse).on(qWork.recruitment.guestHouseUid.eq(qGuestHouse.uid))
                .fetch();
        return null;
    }
}
