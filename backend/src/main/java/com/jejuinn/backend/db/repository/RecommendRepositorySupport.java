package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.dto.response.recommender.*;
import com.jejuinn.backend.db.entity.*;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ListPath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.querydsl.jpa.JPAExpressions.select;

@Repository
@RequiredArgsConstructor
public class RecommendRepositorySupport {

    private final JPAQueryFactory factory;
    QWork qWork = QWork.work;
    QGuestHouse qGuestHouse = QGuestHouse.guestHouse;
    QPersonType qPersonType = QPersonType.personType;
    QRecruitment qRecruitment = QRecruitment.recruitment;
    QResumeInfo qResumeInfo = QResumeInfo.resumeInfo;

    public Optional<RecommendWorkDto> getWorkInfo(Long workUid){
        RecommendWorkDto result = factory.select(new QRecommendWorkDto(
                        qWork.workName,
                        qWork.gender,
                        qWork.minWorkPeriod,
                        qWork.workTime,
                        qWork.workDays,
                        qWork.daysOff,
                        qGuestHouse.uid,
                        qGuestHouse.area,
                        qWork.recruitment.addInfo,
                        qWork.recruitment.welfare,
                        qGuestHouse.tags,
                        qWork.recruitment
                ))
                .from(qWork)
                .join(qGuestHouse).on(qWork.recruitment.guestHouseUid.eq(qGuestHouse.uid))
                .where(qWork.uid.eq(workUid))
                .fetchOne();
         return Optional.ofNullable(result);
    }

    public List<RecommendResumeDto> getResumeInfo(RecommendWorkDto request){
        return factory.select(new QRecommendResumeDto(
                    qResumeInfo.uid,
                    qResumeInfo.user.uid,
                    qResumeInfo.content,
                    qResumeInfo.guestHouseType
                ))
                .from(qResumeInfo)
                .where(qResumeInfo.isDeleted.eq(false), // 삭제 되지 않은 지원서만
                        qResumeInfo.autoApply.eq(true), // 자동 지원 대상자만
                        genderEq(request.getGender()), // 성별 같은 사람만
//                        qResumeInfo.possibleStartDate.lt(LocalDate.now()),
                        qResumeInfo.interestAreas.any().in(Area.builder().areaName(request.getArea()).build())) // 지역이 해당하는 사람만
                .fetch();
    }

    public List<PersonType> projectionTest(Long uid){
        return factory.select(qPersonType)
                .from(qRecruitment)
                .innerJoin(qRecruitment.wanted, qPersonType)
                .where(qRecruitment.uid.eq(uid))
                .fetch();
    }

    private BooleanExpression genderEq (String gender){
        if (gender.equals("무관")) return null;
        return qResumeInfo.user.gender.eq(gender);
    }
}
