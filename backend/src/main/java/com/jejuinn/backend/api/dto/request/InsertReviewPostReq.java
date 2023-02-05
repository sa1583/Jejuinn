package com.jejuinn.backend.api.dto.request;

import com.jejuinn.backend.db.entity.TravelPlace;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import com.jejuinn.backend.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsertReviewPostReq {

    @ApiModelProperty(name="명소 uid")
    @NotNull
    private Long travelPlaceUid;

    @ApiModelProperty(name="명소에 대한 별점 1 ~ 5")
    @NotNull
    private int starRating;

    @ApiModelProperty(name="리뷰 내용")
    @NotNull
    private String content;

    public TravelPlaceReview toTravelPlaceReview(Long userUid){
        return TravelPlaceReview.builder()
                .travelPlaceUid(getTravelPlaceUid())
                .starRating(getStarRating())
                .content(getContent())
                .like(0)
                .userUid(userUid)
                .build();
    }
}
