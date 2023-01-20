package com.tamnara.backend.api.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tamnara.backend.api.dto.AuthorityDto;
import com.tamnara.backend.db.entity.User;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

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
    @Size(min = 3, max = 50)
    String nickname;

    @NotNull
    boolean emailReceiveAllow;

    public static SignupPostReq from(User user) {
        if(user == null) return null;

        return SignupPostReq.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .emailReceiveAllow(user.isEmailReceiveAllow())
//                .authorityDtoSet(user.getAuthorities().stream()
//                        .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
//                        .collect(Collectors.toSet()))
                .build();
    }
}
