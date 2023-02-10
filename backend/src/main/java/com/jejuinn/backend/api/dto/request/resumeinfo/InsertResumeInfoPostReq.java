package com.jejuinn.backend.api.dto.request.resumeinfo;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.db.entity.User;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsertResumeInfoPostReq {

    @NotNull
    private Long userUid;

    @NotNull
    private String content;

    @NotNull
    private LocalDate possibleStartDate;

    @NotNull
    private int minWorkPeriod;

    @NotNull
    private String guestHouseType;

    @NotNull
    private boolean autoApply;

    private String instagramLink;

    private List<String> personTypes;

    private List<String> interestAreas;

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
                .user(User.builder().uid(this.userUid).build())
                .content(this.content)
                .possibleStartDate(this.possibleStartDate)
                .minWorkPeriod(this.minWorkPeriod)
                .autoApply(this.autoApply)
                .guestHouseType(this.guestHouseType)
                .personTypes(toPersonType())
                .interestAreas(toArea())
                .instagramLink(this.instagramLink)
                .build();
    }
}
