package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.dto.response.recommender.QRecommendWorkDto;
import com.jejuinn.backend.api.dto.response.recommender.RecommendWorkDto;
import com.jejuinn.backend.db.entity.QGuestHouse;
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
//        return null;
         return factory.select(new QRecommendWorkDto(
                                    qWork.workName,
                                    qWork.gender,
                                    qWork.minWorkPeriod,
                                    qWork.workTime,
                                    qWork.workDays,
                                    qWork.daysOff,
                                    qGuestHouse.uid,
                                    qGuestHouse.area,
                                    qWork.recruitment.wanted
                            ))
                            .from(qWork)
                            .join(qGuestHouse).on().on(qWork.recruitment.guestHouseUid.eq(qGuestHouse.uid))
                            .where(qWork.uid.eq(workUid))
                            .fetchOne();
    }
}
