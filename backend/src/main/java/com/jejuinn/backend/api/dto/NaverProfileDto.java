package com.jejuinn.backend.api.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NaverProfileDto {
    @NotNull
    String nickname;
    @NotNull
    String name;
    @NotNull
    String email;
    @NotNull
    String gender;
    @NotNull
    String age;
    @NotNull
    String profileImage;
    @NotNull
    String mobile;

    public static NaverProfileDto init(Map<String, String> map){
        if(map.get("gender").equals("F")) {
            map.put("gender", "여자");
        } else if(map.get("gender").equals("M")) {
            map.put("gender", "남자");
        } else {
            map.put("gender", "무관");
        }
        return NaverProfileDto.builder()
                .nickname(map.get("nickname"))
                .name(map.get("name"))
                .email(map.get("email"))
                .gender(map.get("gender"))
                .age(map.get("age"))
                .profileImage(map.get("profile_image"))
                .mobile(map.get("mobile"))
                .build();
    }
}
