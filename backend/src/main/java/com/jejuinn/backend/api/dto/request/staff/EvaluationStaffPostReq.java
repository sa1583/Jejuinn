package com.jejuinn.backend.api.dto.request.staff;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EvaluationStaffPostReq {
    @NotNull
    private Long staffUid;

    @NotNull
    private int score;
}
