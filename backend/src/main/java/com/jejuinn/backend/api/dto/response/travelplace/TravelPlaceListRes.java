package com.jejuinn.backend.api.dto.response.travelplace;

import com.jejuinn.backend.db.entity.TravelPlace;
import lombok.*;

import java.util.List;
import java.util.Optional;

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

    public static TravelPlaceListRes of(TravelPlace travelPlace, Optional<List<String>> images){
        String imgUrl = null;
        if(images.isPresent() && images.get().size() != 0) {
            imgUrl = images.get().get(0);
        }
        return TravelPlaceListRes.builder()
                .travelPlaceUid(travelPlace.getUid())
                .travelPlaceName(travelPlace.getName())
                .lat(travelPlace.getLat())
                .lng(travelPlace.getLng())
                .category(travelPlace.getCategory())
                .mainImgPath(imgUrl)
                .build();
    }
}
