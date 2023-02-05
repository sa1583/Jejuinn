package com.jejuinn.backend.api.dto.response.travelplace;

import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDetailRes {
    @NotNull
    private Long uid;

    @NotNull
    private int starRating;

    private String content;

    @NotNull
    private int like;

    private LocalDateTime dateCreated;

    @NotNull
    private Long travelPlaceUid;

    private Long writer_uid;

    private String writer_nickname;

    private List<Image> images;

    public static ReviewDetailRes of(TravelPlaceReview review, String nickname,List<Image> images){
        if(review == null) return null;
        return ReviewDetailRes.builder()
                .uid(review.getUid())
                .starRating(review.getStarRating())
                .content(review.getContent())
                .like(review.getLikeCount())
                .dateCreated(review.getDateCreated())
                .travelPlaceUid(review.getTravelPlaceUid())
                .writer_uid(review.getUid())
                .writer_nickname(nickname)
                .images(images).build();
    }
}
