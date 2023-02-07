package com.jejuinn.backend.api.dto.response.resumeinfo;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.ResumeInfo;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResumeInfoDetailRes {
    private Long uid;

    private Long userUid;

    private String content;

    private LocalDate possibleStartDate;

    private int minWorkPeriod;

    private boolean autoApply;

    private String guestHouseType;

    private LocalDate dateCreated;

    private List<Area> interestAreas;

    private List<PersonType> personTypes;

    public static ResumeInfoDetailRes of(ResumeInfo resumeInfo) {
        return ResumeInfoDetailRes.builder()
                .uid(resumeInfo.getUid())
                .userUid(resumeInfo.getUser().getUid())
                .content(resumeInfo.getContent())
                .possibleStartDate(resumeInfo.getPossibleStartDate())
                .minWorkPeriod(resumeInfo.getMinWorkPeriod())
                .autoApply(resumeInfo.isAutoApply())
                .guestHouseType(resumeInfo.getGuestHouseType())
                .dateCreated(resumeInfo.getDateCreated())
                .interestAreas(resumeInfo.getInterestAreas())
                .personTypes(resumeInfo.getPersonTypes())
                .build();
    }
}
