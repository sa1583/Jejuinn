package com.jejuinn.backend.api.dto.response.recruitment;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyApplyListRes {
    private Long guestHouseUid;

    private Long recruitmentUid;

    private String guestHouseName;

    private String title;

}
