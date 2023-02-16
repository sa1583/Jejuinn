package com.jejuinn.backend.api.dto.response.guesthouse;

import com.jejuinn.backend.db.entity.GuestHouse;
import lombok.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GuestHouseDeatilDto {
    private Long uid;

    private String guestHouseName;

    private Long representativeUid;

    private String email;

    private String phone;

    private String introduction;

    private List<String> guestHouseTypes;

    private String address;

    private String addressDetail;

    private double lat;

    private double lng;

    private String areaName;

    private LocalDate dateCreated;

    public static List<String> toGuestHouseTypes(String guestHouseTypes) {
        if(guestHouseTypes == null || guestHouseTypes.equals("")) return null;
        List<String> result = Arrays.asList(guestHouseTypes.split(","));
        return result;
    }

    public static GuestHouseDeatilDto of(GuestHouse guestHouse) {
        if(guestHouse == null) return null;
        return GuestHouseDeatilDto.builder()
                .uid(guestHouse.getUid())
                .guestHouseName(guestHouse.getGuestHouseName())
                .email(guestHouse.getEmail())
                .phone(guestHouse.getPhone())
                .introduction(guestHouse.getIntroduction())
                .representativeUid(guestHouse.getRepresentativeUid())
                .address(guestHouse.getAddress())
                .addressDetail(guestHouse.getAddressDetail())
                .lat(guestHouse.getLat())
                .lng(guestHouse.getLng())
                .dateCreated(guestHouse.getDateCreated())
                .guestHouseTypes(toGuestHouseTypes(guestHouse.getTags()))
                .areaName(guestHouse.getArea().getAreaName())
                .build();
    }
}
