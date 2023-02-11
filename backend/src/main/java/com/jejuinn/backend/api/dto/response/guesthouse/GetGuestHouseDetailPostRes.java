package com.jejuinn.backend.api.dto.response.guesthouse;

import com.jejuinn.backend.api.dto.GuestHouseDto;
import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.entity.Image;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GetGuestHouseDetailPostRes {
    private GuestHouseDto guestHouse;
    private List<Image> images;

    public static GetGuestHouseDetailPostRes of(GuestHouseDto guestHouse, List<Image> images){
        return GetGuestHouseDetailPostRes.builder()
                .guestHouse(guestHouse)
                .images(images)
                .build();
    }

}
