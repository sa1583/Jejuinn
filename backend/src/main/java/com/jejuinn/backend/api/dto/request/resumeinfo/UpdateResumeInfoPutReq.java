package com.jejuinn.backend.api.dto.request.resumeinfo;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.db.entity.User;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateResumeInfoPutReq {
    private Long uid;

    private String content;

    private LocalDate possibleStartDate;

    private int minWorkPeriod;

    private boolean autoApply;

    private List<String> personTypes;

    private List<String> interestAreas;

    private Long userUid;

    private LocalDate dateCreated;

    private String instagramLink;

    public List<PersonType> toPersonType() {
        List<PersonType> list = new ArrayList<>();
        for(String s : this.getPersonTypes()) {
            list.add(PersonType.builder().type(s).build());
        }
        return list;
    }

    public List<Area> toArea() {
        List<Area> list = new ArrayList<>();
        for(String s : this.getInterestAreas()) {
            list.add(Area.builder().areaName(s).build());
        }
        return list;
    }

    public ResumeInfo toResumeInfo() {
        return ResumeInfo.builder()
                .uid(this.uid)
                .user(User.builder().uid(userUid).build())
                .content(this.content)
                .possibleStartDate(this.possibleStartDate)
                .minWorkPeriod(this.minWorkPeriod)
                .autoApply(this.autoApply)
                .dateCreated(LocalDate.now())
                .personTypes(toPersonType())
                .interestAreas(toArea())
                .instagramLink(this.instagramLink)
                .build();
    }
}
