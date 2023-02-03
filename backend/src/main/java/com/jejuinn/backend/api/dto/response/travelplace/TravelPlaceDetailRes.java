package com.jejuinn.backend.api.dto.response.travelplace;

import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.entity.TravelPlace;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TravelPlaceDetailRes {
    private TravelPlace travelPlace;
    private List<Image> images;
    private List<ImgUrlWithReviewUid> reviews;

    public static TravelPlaceDetailRes of(TravelPlace travelPlace, List<Image> images, List<ImgUrlWithReviewUid> reviews){
        return TravelPlaceDetailRes.builder()
                .travelPlace(travelPlace)
                .images(images)
                .reviews(reviews)
                .build();
    }
}
