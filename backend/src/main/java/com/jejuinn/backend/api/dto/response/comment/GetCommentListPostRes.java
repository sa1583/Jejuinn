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
    private String postType;

    private Long postUid;

    private Long userUid;

    private String nickname;

    private String content;

    private LocalDateTime dateCreated;

    public static GetCommentListPostRes of(Comment comment, User user) {
        return GetCommentListPostRes.builder()
                .postType(comment.getPostType())
                .postUid(comment.getPostUid())
                .userUid(comment.getUserUid())
                .nickname(user.getNickname())
                .content(comment.getContent())
                .dateCreated(comment.getDateCreated())
                .build();
    }
}
