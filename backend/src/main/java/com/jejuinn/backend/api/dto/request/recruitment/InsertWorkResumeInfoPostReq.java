package com.jejuinn.backend.api.dto.request.recruitment;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsertWorkResumeInfoPostReq {
    @NotNull
    private Long userUid;

    @NotNull
    private Long workUid;
}
