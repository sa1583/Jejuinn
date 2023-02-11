package com.jejuinn.backend.api.dto.response.guesthouse;

import com.jejuinn.backend.api.dto.GuestHouseDto;
import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.entity.Favorite;
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
    private GuestHouseDeatilDto guestHouse;
    private List<Image> images;
    private boolean favorite;

    public static GetGuestHouseDetailPostRes of(GuestHouseDeatilDto guestHouseDetailDto, List<Image> images, Favorite favorite){
        return GetGuestHouseDetailPostRes.builder()
                .guestHouse(guestHouseDetailDto)
                .images(images)
                .favorite(favorite != null ? true : false)
                .build();
    }

}
