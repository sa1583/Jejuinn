package com.jejuinn.backend.api.dto.request.recruitment;

import com.jejuinn.backend.db.entity.Recruitment;
import com.jejuinn.backend.db.entity.Work;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsertWorkPostReq {
    @ApiModelProperty(name = "직무 이름")
    @NotNull
    private String workName;

    @ApiModelProperty(name = "채용 인원수")
    @NotNull
    private int intake;

    @ApiModelProperty(name = "성별")
    @NotNull
    private String gender;

    @ApiModelProperty(name = "최소 근무 기간")
    @NotNull
    private int minWorkPeriod;

    @ApiModelProperty(name = "근무 시간")
    @NotNull
    private String workTime;

    @ApiModelProperty(name = "근무 기간")
    @NotNull
    private int workDays;

    @ApiModelProperty(name = "휴무 기간")
    @NotNull
    private int daysOff;

    @ApiModelProperty(name = "직무 설명")
    private String workDescription;

    @ApiModelProperty(name = "급여")
    @NotNull
    private String salary;

    @NotNull
    private LocalDate entryDate;

    public Work toWork(Recruitment recruitment) {
        return Work.builder()
                .recruitment(recruitment)
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
