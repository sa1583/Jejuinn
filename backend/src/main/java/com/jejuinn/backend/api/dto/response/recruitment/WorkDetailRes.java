package com.jejuinn.backend.api.dto.response.recruitment;

import com.jejuinn.backend.db.entity.Work;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkDetailRes {

    private Long uid;

    private String workName;

    private int intake;

    private String gender;

    private int minWorkPeriod;

    private String workTime;

    private int workDays;

    private int daysOff;

    private String salary;

    private String workDescription;

    private LocalDate entryDate;

    public static List<WorkDetailRes> ofDetail(List<Work> works) {
        List<WorkDetailRes> result = new ArrayList<>();
        for(Work work : works) {
            if(work == null) continue;
            WorkDetailRes workDetailRes = WorkDetailRes.builder()
                    .uid(work.getUid())
                    .workName(work.getWorkName())
                    .intake(work.getIntake())
                    .gender(work.getGender())
                    .minWorkPeriod(work.getMinWorkPeriod())
                    .workDays(work.getWorkDays())
                    .daysOff(work.getDaysOff())
                    .salary(work.getSalary())
                    .workDescription(work.getWorkDescription())
                    .entryDate(work.getEntryDate())
                    .build();
            result.add(workDetailRes);
        }
        return result;
    }

}
