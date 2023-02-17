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
public class UpdateResumeInfoPutReq {
    @NotNull
    private Long uid;

    @NotNull
    private String content;

    @NotNull
    private LocalDate possibleStartDate;

    @NotNull
    private int minWorkPeriod;

    @NotNull
    private boolean autoApply;

    @NotNull
    private List<String> personTypes;

    @NotNull
    private String interestArea;

    @NotNull
    private Long userUid;

    private LocalDate dateCreated;

    private String instagramLink;

    @NotNull
    private List<String> guestHouseTypes;

    public String toGuestHouseType() {
        String type = "";
        for(String s : this.getGuestHouseTypes()) {
            type += s + ",";
        }
        if(type.equals("") || type.equals(null)) {
            return null;
        }
        type = type.substring(0,type.length()-1);
        return type;
    }

    public List<PersonType> toPersonType() {
        List<PersonType> list = new ArrayList<>();
        for(String s : this.getPersonTypes()) {
            list.add(PersonType.builder().type(s).build());
        }
        return list;
    }

    public List<Area> toArea() {
        List<Area> list = new ArrayList<>();
        list.add(Area.builder().areaName(this.getInterestArea()).build());
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
                .guestHouseType(toGuestHouseType())
                .build();
    }
}
