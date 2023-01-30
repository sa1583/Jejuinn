package com.jejuinn.backend.api.dto.response;

import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.entity.Image;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GuestHouseWithImageAndCommentRes {
    private GuestHouse guestHouse;
    private List<Image> images;
    private List<Comment> comments;

    public static GuestHouseWithImageAndCommentRes of(GuestHouse guestHouse, List<Image> images, List<Comment> comments){
        return GuestHouseWithImageAndCommentRes.builder()
                .guestHouse(guestHouse)
                .images(images)
                .comments(comments)
                .build();
    }

}