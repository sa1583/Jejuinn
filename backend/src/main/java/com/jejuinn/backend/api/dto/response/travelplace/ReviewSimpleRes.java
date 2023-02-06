package com.jejuinn.backend.api.dto.response.travelplace;

import com.jejuinn.backend.db.entity.TravelPlace;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewSimpleRes {

    private Long uid;

    private String imgUrl;

    public static ReviewSimpleRes of(TravelPlaceReview review, String imgUrl){
        return ReviewSimpleRes.builder()
                .uid(review.getUid())
                .imgUrl(imgUrl)
                .build();
    }
}
