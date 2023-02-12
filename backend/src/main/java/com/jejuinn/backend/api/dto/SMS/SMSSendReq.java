package com.jejuinn.backend.api.dto.SMS;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SMSSendReq {

    private String to;

    private Long guestHouseUid;

}
