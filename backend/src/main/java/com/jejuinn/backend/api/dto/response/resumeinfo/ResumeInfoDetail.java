package com.jejuinn.backend.api.dto.response.resumeinfo;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.exception.NoContentException;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResumeInfoDetail {
    private Long uid;

    private String content;

    private LocalDate possibleStartDate;

    private int minWorkPeriod;

    private boolean autoApply;

    private String guestHouseType;

    private LocalDate dateCreated;

    private List<Area> interestAreas;

    private List<PersonType> personTypes;

    private LocalDate isRead;

    private String instagramLink;

    public static ResumeInfoDetail of(Optional<ResumeInfo> resumeInfo) {
        if(resumeInfo.isEmpty()) return null;
        return ResumeInfoDetail.builder()
                .uid(resumeInfo.get().getUid())
                .content(resumeInfo.get().getContent())
                .possibleStartDate(resumeInfo.get().getPossibleStartDate())
                .minWorkPeriod(resumeInfo.get().getMinWorkPeriod())
                .autoApply(resumeInfo.get().isAutoApply())
                .guestHouseType(resumeInfo.get().getGuestHouseType())
                .dateCreated(resumeInfo.get().getDateCreated())
                .interestAreas(resumeInfo.get().getInterestAreas())
                .personTypes(resumeInfo.get().getPersonTypes())
                .isRead(resumeInfo.get().getIsRead())
                .instagramLink(resumeInfo.get().getInstagramLink())
                .build();
    }

    public static ResumeInfoDetail ofCEO(Optional<ResumeInfo> resumeInfo) {
        if(resumeInfo.isEmpty()) return null;
        return ResumeInfoDetail.builder()
                .uid(resumeInfo.get().getUid())
                .content(resumeInfo.get().getContent())
                .possibleStartDate(resumeInfo.get().getPossibleStartDate())
                .minWorkPeriod(resumeInfo.get().getMinWorkPeriod())
                .autoApply(resumeInfo.get().isAutoApply())
                .guestHouseType(resumeInfo.get().getGuestHouseType())
                .dateCreated(resumeInfo.get().getDateCreated())
                .interestAreas(resumeInfo.get().getInterestAreas())
                .personTypes(resumeInfo.get().getPersonTypes())
                .instagramLink(resumeInfo.get().getInstagramLink())
                .build();
    }
}