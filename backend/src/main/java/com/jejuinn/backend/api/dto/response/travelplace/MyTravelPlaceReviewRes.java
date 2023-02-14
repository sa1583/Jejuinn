package com.jejuinn.backend.api.dto.response.travelplace;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyTravelPlaceReviewRes {

    private Long ReviewUid;

    private LocalDateTime dateCreated;

    private String TravelPlaceName;
}
