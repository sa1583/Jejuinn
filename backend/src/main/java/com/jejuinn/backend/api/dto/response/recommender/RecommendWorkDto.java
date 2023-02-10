package com.jejuinn.backend.api.dto.response.recommender;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.Recruitment;
import com.jejuinn.backend.db.entity.Work;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class RecommendWorkDto {
    private String workName;

    private String gender;

    private int minWorkPeriod;

    private String workTime;

    private int workDays;

    private int daysOff;

    private Long guestHouseUid;

    private String area;

    private List<String> guestHouseType;

    private List<String> personType;

    @QueryProjection
    public RecommendWorkDto(String workName, String gender, int minWorkPeriod, String workTime, int workDays, int daysOff, Long guestHouseUid, Area area, String guestHouseType,Recruitment recruitment) {
        this.workName = workName;
        this.gender = gender;
        this.minWorkPeriod = minWorkPeriod;
        this.workTime = workTime;
        this.workDays = workDays;
        this.daysOff = daysOff;
        this.guestHouseUid = guestHouseUid;
        this.area = area.getAreaName();
        this.guestHouseType = List.of(guestHouseType.split(","));
//        this.guestHouseType = this.getPersonType().subList(1, this.guestHouseType.size());
        this.personType = recruitment.getWanted().stream().map(pType -> pType.getType()).collect(Collectors.toList());
    }
}
