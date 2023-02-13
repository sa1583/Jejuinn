package com.jejuinn.backend.api.dto.response.resumeinfo;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.ResumeInfo;
import lombok.*;

import java.time.LocalDate;
import java.util.Arrays;
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

    private List<String> guestHouseTypes;

    private LocalDate dateCreated;

    private List<Area> interestAreas;

    private List<PersonType> personTypes;

    private String instagramLink;

    public static List<String> toGuestHouseTypes(String guestHouseTypes) {
        List<String> result = Arrays.asList(guestHouseTypes.split(","));
        return result;
    }

    public static ResumeInfoDetail of(Optional<ResumeInfo> resumeInfo) {
        if(resumeInfo.isEmpty()) return null;
        return ResumeInfoDetail.builder()
                .uid(resumeInfo.get().getUid())
                .content(resumeInfo.get().getContent())
                .possibleStartDate(resumeInfo.get().getPossibleStartDate())
                .minWorkPeriod(resumeInfo.get().getMinWorkPeriod())
                .autoApply(resumeInfo.get().isAutoApply())
                .guestHouseTypes(toGuestHouseTypes(resumeInfo.get().getGuestHouseType()))
                .dateCreated(resumeInfo.get().getDateCreated())
                .interestAreas(resumeInfo.get().getInterestAreas())
                .personTypes(resumeInfo.get().getPersonTypes())
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
                .guestHouseTypes(toGuestHouseTypes(resumeInfo.get().getGuestHouseType()))
                .dateCreated(resumeInfo.get().getDateCreated())
                .interestAreas(resumeInfo.get().getInterestAreas())
                .personTypes(resumeInfo.get().getPersonTypes())
                .instagramLink(resumeInfo.get().getInstagramLink())
                .build();
    }
}
