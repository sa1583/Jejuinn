package com.tamnara.backend.dto.request;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * 회원가입 요청 DTO ([Post] : /api/users)
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRegisterPostReq {

    @NotNull
    @Size(min = 3, max = 50)
    String userId;
    @NotNull
    String password;
    @NotNull
    @Size(min = 3, max = 50)
    String nickname;
    @NotNull
    @Size(min = 10)
    String email;
    @NotNull
    boolean emailReceiveAllow;
}
