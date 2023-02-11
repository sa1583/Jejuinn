package com.jejuinn.backend.api.dto.request.user;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePwReq {
    private Long userUid;

    private String password;
}
