package com.jejuinn.backend.api.dto.response.recruitment;

import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.db.entity.User;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyApplicantDetailRes {
    private Long userUid;

    private Long resumeInfoUid;

    private String userName;

    private String gender;

    private String age;

    private List<PersonType> personTypes;

    private String content;

    public static MyApplicantDetailRes toMyApplicantDetailRes(ResumeInfo resumeInfo, User user) {
        return MyApplicantDetailRes.builder()
                .userUid(user.getUid())
                .resumeInfoUid(resumeInfo.getUid())
                .userName(user.getUsername())
                .gender(user.getGender())
                .age(user.getAge())
                .content(resumeInfo.getContent())
                .personTypes(resumeInfo.getPersonTypes())
                .build();
    }
}
