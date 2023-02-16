package com.jejuinn.backend.api.dto.request.email;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OpenViduLinkReq {
    @NotNull
    private String url;
    @NotNull
    private Long userUid;
    @NotNull
    private Long guestHouseUid;
}
