package com.jejuinn.backend.api.dto.response.recruitment;

import com.jejuinn.backend.db.entity.Recruitment;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyRecruitmentListRes {

    private Long uid;

    private Long guestHouseUid;

    private String title;

    private LocalDateTime dateCreated;

    public static MyRecruitmentListRes of(Recruitment recruitment) {
        if(recruitment == null) return null;
        return MyRecruitmentListRes.builder()
                .uid(recruitment.getUid())
                .guestHouseUid(recruitment.getGuestHouseUid())
                .title(recruitment.getTitle())
                .dateCreated(recruitment.getDateCreated())
                .build();
    }
}
