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
public class ResumeInfoDetailRes {
    private long uid;

    private long writerUid;

    private String content;

    private LocalDate possibleStartDate;

    private int minWorkPeriod;

    private boolean autoApply;

    private List<String> guestHouseTypes;

    private LocalDate dateCreated;

    private String interestArea;

    private String userName;

    private String gender;

    private String age;

    private String profileImageUrl;

    private String InstagramLink;

    private List<PersonType> personTypes;

    private List<StaffRecordDetail> staffRecordDetail;

    public static ResumeInfoDetailRes of(ResumeInfoDetail resumeInfoDetail,
                                         UserDetail userDetail, List<StaffRecordDetail> staffRecordDetail) {
        return ResumeInfoDetailRes.builder()
                .uid(resumeInfoDetail.getUid())
                .writerUid(userDetail.getUserUid())
                .content(resumeInfoDetail.getContent())
                .possibleStartDate(resumeInfoDetail.getPossibleStartDate())
                .minWorkPeriod(resumeInfoDetail.getMinWorkPeriod())
                .autoApply(resumeInfoDetail.isAutoApply())
                .guestHouseTypes(resumeInfoDetail.getGuestHouseTypes())
                .dateCreated(resumeInfoDetail.getDateCreated())
                .interestArea(resumeInfoDetail.getInterestAreas().size() != 1?
                        "전체":resumeInfoDetail.getInterestAreas().get(0).getAreaName())
                .personTypes(resumeInfoDetail.getPersonTypes())
                .staffRecordDetail(staffRecordDetail)
                .userName(userDetail.getUserName())
                .gender(userDetail.getGender())
                .age(userDetail.getAge())
                .profileImageUrl(userDetail.getProfileImageUrl())
                .InstagramLink(resumeInfoDetail.getInstagramLink())
                .build();
    }

}
