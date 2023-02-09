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

    public static TravelPlaceDetailRes of(TravelPlace travelPlace, List<Image> images){
        return TravelPlaceDetailRes.builder()
                .travelPlace(travelPlace)
                .images(images)
                .build();
    }
}
