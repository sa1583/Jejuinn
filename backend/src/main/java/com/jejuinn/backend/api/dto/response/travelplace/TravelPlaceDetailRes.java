package com.jejuinn.backend.api.dto.response.travelplace;

import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.entity.TravelPlace;
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
    private List<ImgUrlAndReviewUid> reviews;

    public static TravelPlaceDetailRes of(TravelPlace travelPlace, List<Image> images, List<ImgUrlAndReviewUid> reviews){
        return TravelPlaceDetailRes.builder()
                .travelPlace(travelPlace)
                .images(images)
                .reviews(reviews)
                .build();
    }
}
