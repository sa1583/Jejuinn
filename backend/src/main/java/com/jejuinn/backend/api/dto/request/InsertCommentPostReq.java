package com.jejuinn.backend.api.dto.request;

import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.entity.GuestHouse;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsertCommentPostReq {
    @NotNull
    private String postType;
    @NotNull
    private String postUid;
    @NotNull
    private String content;

    public Comment toComment(Long userUid){
        return Comment.builder()
                .postType(this.getPostType())
                .postUid(Long.parseLong(this.getPostUid()))
                .content(this.getContent())
                .userUid(userUid)
                .build();
    }
}
