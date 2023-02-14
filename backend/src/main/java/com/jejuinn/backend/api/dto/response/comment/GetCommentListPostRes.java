package com.jejuinn.backend.api.dto.response.comment;

import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetCommentListPostRes {
    private Long commentUid;

    private String postType;

    private Long postUid;

    private Long userUid;

    private String nickname;

    private String content;

    private LocalDateTime dateCreated;

    private String profileImgUrl;

    private boolean isStaff;

    public static GetCommentListPostRes of(Comment comment, User user) {
        return GetCommentListPostRes.builder()
                .commentUid(comment.getUid())
                .postType(comment.getPostType())
                .postUid(comment.getPostUid())
                .userUid(comment.getUserUid())
                .nickname(user.getNickname())
                .content(comment.getContent())
                .dateCreated(comment.getDateCreated())
                .profileImgUrl(user.getProfileImageUrl())
                .isStaff(user.isStaff())
                .build();
    }
}
