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

    private double lat;

    private double lng;

    public static TravelPlaceListRes of(TravelPlace travelPlace, String imgPath){
        return null;
    }
}
