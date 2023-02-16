package com.jejuinn.backend.api.dto.response.resumeinfo;

import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.exception.NoContentException;
import lombok.*;

import java.util.Optional;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetail {
    private long userUid;

    private String userName;

    private String gender;

    private String age;

    private String profileImageUrl;

    public static UserDetail of(Optional<User> user) {
        if(user.isEmpty()) return null;
        return UserDetail.builder()
                .userUid(user.get().getUid())
                .userName(user.get().getUsername())
                .gender(user.get().getGender())
                .age(user.get().getAge())
                .profileImageUrl(user.get().getProfileImageUrl())
                .build();
    }
}
