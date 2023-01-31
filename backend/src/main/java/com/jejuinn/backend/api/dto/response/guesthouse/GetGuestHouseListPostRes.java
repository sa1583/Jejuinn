package com.jejuinn.backend.api.dto.response.guesthouse;

import com.jejuinn.backend.api.dto.GuestHouseDto;
import com.jejuinn.backend.api.dto.SimpleImgDto;
import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.entity.Image;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GetGuestHouseListPostRes {
    private GuestHouseDto guestHouse;
    private List<SimpleImgDto> images;

    public static GetGuestHouseListPostRes of(GuestHouse guestHouse, List<Image> images){
        return GetGuestHouseListPostRes.builder()
                .guestHouse(GuestHouseDto.of(guestHouse))
                .images(images.stream()
                        .map(image -> SimpleImgDto.of(image))
                        .collect(Collectors.toList()))
                .build();
    }
}
