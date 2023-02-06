package com.jejuinn.backend.api.dto.response.travelplace;

import com.jejuinn.backend.db.entity.TravelPlace;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TravelPlaceListRes {

    private Long travelPlaceUid;

    private String travelPlaceName;

    private double lat;

    private double lng;

    private String category;

    private String mainImgPath;

    public static TravelPlaceListRes of(TravelPlace travelPlace, String imgPath){
        return TravelPlaceListRes.builder()
                .travelPlaceUid(travelPlace.getUid())
                .travelPlaceName(travelPlace.getName())
                .lat(travelPlace.getLat())
                .lng(travelPlace.getLng())
                .category(travelPlace.getCategory())
                .mainImgPath(imgPath)
                .build();
    }
}
