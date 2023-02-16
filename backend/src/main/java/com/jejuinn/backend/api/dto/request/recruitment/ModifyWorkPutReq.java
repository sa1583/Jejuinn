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
public class ModifyWorkPutReq {
    @NotNull
    private Long workUid;

    @NotNull
    private Long recruitmentUid;

    @NotNull
    private String workName;

    @NotNull
    private int intake;

    @NotNull
    private String gender;

    @NotNull
    private int minWorkPeriod;

    @NotNull
    private String workTime;

    @NotNull
    private int workDays;

    @NotNull
    private int daysOff;

    private String workDescription;

    @NotNull
    private String salary;

    @NotNull
    private LocalDate entryDate;

    public Work toWork() {
        return Work.builder()
                .uid(this.workUid)
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
