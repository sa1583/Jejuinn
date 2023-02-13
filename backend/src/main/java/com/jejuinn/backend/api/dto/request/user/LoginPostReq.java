package com.jejuinn.backend.api.dto.request.user;

import io.swagger.annotations.ApiModelProperty;
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
    @ApiModelProperty(name="유저 Email", example="ssafy.jaewook@gmail.com")
    private String email;

    @NotNull
    @Size(min = 3, max = 100)
    @ApiModelProperty(name="유저 Password", example="admin")
    private String password;
}