package com.jejuinn.backend.api.dto.request.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jejuinn.backend.db.entity.Authority;
import com.jejuinn.backend.db.entity.User;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

/**
 * 회원가입 요청 DTO ([Post] : /api/users)
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SignupPostReq {

    @NotNull
    @Size(min = 10)
    String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    String password;

    @NotNull
    @Size(min = 2, max = 50)
    String nickname;

    public static User from(SignupPostReq req, Set<Authority> authorities) {
        if(req == null) return null;

        return User.builder()
                .nickname(req.getNickname())
                .email(req.getEmail())
                .password(req.getPassword())
                .sugarContent(8)
                .isStaff(false)
                .authorities(authorities)
                .build();
    }
}
