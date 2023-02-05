package com.jejuinn.backend.api.dto.response.recruitment;

import com.jejuinn.backend.db.entity.Work;
import lombok.*;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkDetailRes {

    private String workName;

    private int intake;

    private String gender;

    private int minWorkPeriod;

    private String workTime;

    private int workDays;

    private int daysOff;

    private String salary;

    private String workDescription;

    public static List<WorkDetailRes> ofDetail(List<Work> works) {
        List<WorkDetailRes> result = new ArrayList<>();
        for(Work work : works) {
            WorkDetailRes workDetailRes = WorkDetailRes.builder()
                    .workName(work.getWorkName())
                    .intake(work.getIntake())
                    .gender(work.getGender())
                    .minWorkPeriod(work.getMinWorkPeriod())
                    .workDays(work.getWorkDays())
                    .daysOff(work.getDaysOff())
                    .salary(work.getSalary())
                    .workDescription(work.getWorkDescription())
                    .build();
            result.add(workDetailRes);
        }
        return result;
    }
}
