package com.jejuinn.backend.api.dto.response.user;

import com.jejuinn.backend.db.entity.User;
import lombok.*;

/**
 * 회원정보 응답 DTO ([Post] : /auth/users)
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GetUserInfoPostRes {

    private Long uid;

    private String email;

    private String username;

    private String nickname;

    private String phone;

    private int sugarContent;


    public static GetUserInfoPostRes from(User user) {
        System.out.println(user.getUsername());
        return GetUserInfoPostRes.builder()
                .uid(user.getUid())
                .email(user.getEmail())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .sugarContent((int) user.getSugarContent())
                .phone(user.getPhone()).build();
    }
}
