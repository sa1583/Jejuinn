package com.jejuinn.backend.api.dto.response.travelplace;

import com.jejuinn.backend.db.entity.TravelPlace;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import lombok.*;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewSimpleRes {

    private Long uid;

    private String imgUrl;

    public static ReviewSimpleRes of(TravelPlaceReview review, Optional<List<String>> images){
        String imgUrl = null;
        if(images.isPresent()) imgUrl = images.get().get(0);
        return ReviewSimpleRes.builder()
                .uid(review.getUid())
                .imgUrl(imgUrl)
                .build();
    }
}
