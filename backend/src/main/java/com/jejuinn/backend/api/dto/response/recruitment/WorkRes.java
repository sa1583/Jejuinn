package com.jejuinn.backend.api.dto.response.recruitment;

import com.jejuinn.backend.db.entity.Work;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkRes {

    private Long writerUid;

    private Long workUid;

    private Long recruitmentUid;

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

    public static WorkRes of(Work work, Long userUid) {
        if(work == null) return null;
        return WorkRes.builder()
                .writerUid(userUid)
                .workDescription(work.getWorkDescription())
                .workUid(work.getUid())
                .recruitmentUid(work.getRecruitment().getUid())
                .workName(work.getWorkName())
                .intake(work.getIntake())
                .gender(work.getGender())
                .minWorkPeriod(work.getMinWorkPeriod())
                .workDays(work.getWorkDays())
                .workTime(work.getWorkTime())
                .daysOff(work.getDaysOff())
                .salary(work.getSalary())
                .entryDate(work.getEntryDate())
                .build();
    }

    public static List<WorkRes> ofs(List<Work> works, Long userUid) {
        List<WorkRes> result = new ArrayList<>();
        for(Work work : works) {
            WorkRes workRes = WorkRes.builder()
                    .writerUid(userUid)
                    .workDescription(work.getWorkDescription())
                    .workUid(work.getUid())
                    .recruitmentUid(work.getRecruitment().getUid())
                    .workName(work.getWorkName())
                    .intake(work.getIntake())
                    .gender(work.getGender())
                    .minWorkPeriod(work.getMinWorkPeriod())
                    .workDays(work.getWorkDays())
                    .workTime(work.getWorkTime())
                    .daysOff(work.getDaysOff())
                    .salary(work.getSalary())
                    .entryDate(work.getEntryDate())
                    .build();
            result.add(workRes);
        }
        return result;
    }

}
