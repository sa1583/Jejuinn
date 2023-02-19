package com.jejuinn.backend.api.dto.request;

import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.entity.GuestHouse;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsertCommentPostReq {
    @NotNull
    @Size(min = 1)
    private String postType;
    @NotNull
    private String postUid;
    @Size(min = 1)
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
