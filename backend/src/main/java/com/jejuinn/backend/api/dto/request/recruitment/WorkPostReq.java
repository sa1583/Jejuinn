package com.jejuinn.backend.api.dto.request.recruitment;

import com.jejuinn.backend.db.entity.Recruitment;
import com.jejuinn.backend.db.entity.Work;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkPostReq {

    private Long recruitmentUid;

    private String workName;

    private int intake;

    private String gender;

    private int minWorkPeriod;

    private String workTime;

    private int workDays;

    private int daysOff;

    private String workDescription;

    private String salary;

    private LocalDate entryDate;

    public Work toWork() {
        return Work.builder()
                .recruitment(Recruitment.builder().uid(this.recruitmentUid).build())
                .workName(this.workName)
                .intake(this.intake)
                .gender(this.gender)
                .minWorkPeriod(this.minWorkPeriod)
                .workTime(this.workTime)
                .workDays(this.workDays)
                .daysOff(this.daysOff)
                .workDescription(this.workDescription)
                .salary(this.salary)
                .entryDate(this.entryDate)
                .build();
    }
}
