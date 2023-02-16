package com.jejuinn.backend.api.dto.response.resumeinfo;

import com.jejuinn.backend.db.entity.PersonType;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResumeInfoRes {
    private Long userUid;
    private String UserName;
    private String Tags;
    private String Gender;
    private String Age;
}
