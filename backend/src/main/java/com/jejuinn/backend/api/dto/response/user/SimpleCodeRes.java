package com.jejuinn.backend.api.dto.response.user;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * 이메일만 있는 DTO
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SimpleCodeRes {
    @NotNull
    String code;

    @NotNull
    Long userUid;
}
