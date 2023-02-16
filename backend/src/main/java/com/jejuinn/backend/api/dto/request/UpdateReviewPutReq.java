package com.jejuinn.backend.api.dto.request;

import com.jejuinn.backend.db.entity.TravelPlaceReview;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UpdateReviewPutReq {

    @NotNull
    private int starRating;

    @NotNull
    private String content;

    public TravelPlaceReview toTravelPlaceReview(Long reviewUid){
        return TravelPlaceReview.builder()
                .uid(reviewUid)
                .content(content)
                .starRating(starRating)
                .build();
    }
}
