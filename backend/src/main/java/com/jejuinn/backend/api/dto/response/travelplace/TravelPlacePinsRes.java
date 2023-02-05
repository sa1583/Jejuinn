package com.jejuinn.backend.api.dto.response.travelplace;

import com.jejuinn.backend.db.entity.TravelPlace;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TravelPlacePinsRes {

    private Long travelPlaceUid;

    private double lat;

    private double lng;

    public static TravelPlacePinsRes of(TravelPlace travelPlace){
        return TravelPlacePinsRes.builder()
                .travelPlaceUid(travelPlace.getUid())
                .lat(travelPlace.getLat())
                .lng(travelPlace.getLng())
                .build();
    }
}
