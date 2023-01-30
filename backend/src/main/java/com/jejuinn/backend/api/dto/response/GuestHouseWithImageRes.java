package com.jejuinn.backend.api.dto.response;

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
public class GuestHouseWithImageRes {
    private GuestHouse guestHouse;
    private List<Image> images;

    public static GuestHouseWithImageRes of(GuestHouse guestHouse, List<Image> images){
        return GuestHouseWithImageRes.builder()
                .guestHouse(guestHouse)
                .images(images)
                .build();
    }
}
