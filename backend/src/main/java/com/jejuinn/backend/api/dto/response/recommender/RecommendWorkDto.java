package com.jejuinn.backend.api.dto.response.recommender;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.Work;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendWorkDto {
    private String workName;

    private String gender;

    private int minWorkPeriod;

    private String workTime;

    private int workDays;

    private int daysOff;

    private Long guestHouseUid;

    private String area;

    private List<String> personTypes;

    @QueryProjection
    public RecommendWorkDto(String workName, String gender, int minWorkPeriod, String workTime, int workDays, int daysOff, Long guestHouseUid, Area area, List<PersonType> personTypes) {
        this.workName = workName;
        this.gender = gender;
        this.minWorkPeriod = minWorkPeriod;
        this.workTime = workTime;
        this.workDays = workDays;
        this.daysOff = daysOff;
        this.guestHouseUid = guestHouseUid;
        this.area = area.getAreaName();
        this.personTypes = personTypes.stream().map(personType -> personType.getType()).collect(Collectors.toList());
    }

    public static RecommendWorkDto of(Work work){
        if(work == null) return null;
        return RecommendWorkDto.builder()
                .workName(work.getWorkName())
                .gender(work.getGender())
                .minWorkPeriod(work.getMinWorkPeriod())
                .workTime(work.getWorkTime())
                .workDays(work.getWorkDays())
                .daysOff(work.getDaysOff())
                .build();
    }

}
