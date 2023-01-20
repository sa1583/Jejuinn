package com.tamnara.backend.api.dto.request;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginPostReq {

    @NotNull
    @Size(min = 3)
    private String email;

    @NotNull
    @Size(min = 3, max = 100)
    private String password;
}