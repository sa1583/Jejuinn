package com.jejuinn.backend.api.dto.response.recruitment;

import com.jejuinn.backend.db.entity.Work;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkListRes {

    private Long recruitmentUid;

    private String workName;

    private int intake;

    private String gender;

    private int minWorkPeriod;

    private String workTime;

    private int workDays;

    private int daysOff;

    private String salary;

    public static WorkListRes of(Work work) {
        if(work == null) return null;
        return WorkListRes.builder()
                .recruitmentUid(work.getRecruitment().getUid())
                .workName(work.getWorkName())
                .intake(work.getIntake())
                .gender(work.getGender())
                .minWorkPeriod(work.getMinWorkPeriod())
                .workDays(work.getWorkDays())
                .daysOff(work.getDaysOff())
                .salary(work.getSalary())
                .build();
    }

}
