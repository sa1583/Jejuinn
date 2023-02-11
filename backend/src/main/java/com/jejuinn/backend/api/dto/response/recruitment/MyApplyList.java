package com.jejuinn.backend.api.dto.response.recruitment;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyApplyList {
    private Long guestHouseUid;

    private Long recruitmentUid;

    private String guestHouseName;

    private String title;

    private LocalDateTime isRead;
}
