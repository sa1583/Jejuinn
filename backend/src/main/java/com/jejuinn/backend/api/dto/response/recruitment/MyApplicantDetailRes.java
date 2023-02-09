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

    private String userName;

    private String gender;

    private String age;

    private List<PersonType> personTypes;

    public static MyApplicantDetailRes toMyApplicantDetailRes(ResumeInfo resumeInfo, User user) {
        return MyApplicantDetailRes.builder()
                .userUid(user.getUid())
                .userName(user.getUsername())
                .gender(user.getUsername())
                .age(user.getAge())
                .personTypes(resumeInfo.getPersonTypes())
                .build();
    }
}
