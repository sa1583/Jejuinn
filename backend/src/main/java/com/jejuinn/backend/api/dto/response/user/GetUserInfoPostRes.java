package com.jejuinn.backend.api.dto.response.user;

import com.jejuinn.backend.db.entity.Authority;
import com.jejuinn.backend.db.entity.User;
import lombok.*;

import java.util.Set;

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

    private String profileImageUrl;

    private String gender;

    private String age;

    private Set<Authority> authorities;

    public static GetUserInfoPostRes from(User user) {
        System.out.println(user.getUsername());
        return GetUserInfoPostRes.builder()
                .uid(user.getUid())
                .email(user.getEmail())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .sugarContent((int) user.getSugarContent())
                .profileImageUrl(user.getProfileImageUrl())
                .gender(user.getGender())
                .age(user.getAge())
                .authorities(user.getAuthorities())
                .phone(user.getPhone()).build();
    }
}
