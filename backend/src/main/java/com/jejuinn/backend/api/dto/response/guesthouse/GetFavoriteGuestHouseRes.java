package com.jejuinn.backend.api.dto.response.guesthouse;

import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.entity.Recruitment;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetFavoriteGuestHouseRes {
    private Long uid;

    private Long recruitmentUid;

    private String guestHouseName;

    private LocalDate dateCreated;

    private String imgUrl;

    public static GetFavoriteGuestHouseRes of(GuestHouse guestHouse, List<Recruitment> recruitment, List<Image> images) {
        String imgUrl = null;
        long recruitmentUid = -1;
        if(recruitment != null && recruitment.size() > 0) recruitmentUid = recruitment.get(0).getUid();
        if(images.size() != 0) imgUrl = images.get(0).getImgPath();
        return GetFavoriteGuestHouseRes.builder()
                .uid(guestHouse.getUid())
                .recruitmentUid(recruitmentUid)
                .guestHouseName(guestHouse.getGuestHouseName())
                .dateCreated(guestHouse.getDateCreated())
                .imgUrl(imgUrl)
                .build();
    }

}