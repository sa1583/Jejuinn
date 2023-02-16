package com.jejuinn.backend.api.dto.response.travelplace;

import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import com.jejuinn.backend.db.entity.User;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    private String profileImageUrl;

    private List<Image> images;

    public static ReviewDetailRes of(TravelPlaceReview review, Optional<User> user, List<Image> images){
        if(review == null) return null;
        if(user.isEmpty()) return null;
        return ReviewDetailRes.builder()
                .uid(review.getUid())
                .starRating(review.getStarRating())
                .content(review.getContent())
                .like(review.getLikeCount())
                .profileImageUrl(user.get().getProfileImageUrl())
                .dateCreated(review.getDateCreated())
                .travelPlaceUid(review.getTravelPlaceUid())
                .writer_uid(review.getUserUid())
                .writer_nickname(user.get().getNickname())
                .images(images).build();
    }
}
