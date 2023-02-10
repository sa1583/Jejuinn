package com.jejuinn.backend.api.dto.request;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.GuestHouse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsertGuestHousePostReq {

    private String guestHouseName;

    private Long representativeUid;

    private String email;

    private String phone;

    private String address;

    private String addressDetail;

    private String introduction;

    private double lat;

    private double lng;

    private List<String> guestHouseTypes;

    private String areaName;

    public String toGuestHouseType() {
        String type = "";
        for(String s : this.getGuestHouseTypes()) {
            type += s + ",";
        }
        if(type.equals("") || type.equals(null)) {
            return null;
        }
        type = type.substring(0,type.length()-1);
        return type;
    }

    public GuestHouse toGuestHouse(){
        return GuestHouse.builder()
                .guestHouseName(this.getGuestHouseName())
                .representativeUid(this.getRepresentativeUid())
                .email(this.getEmail())
                .phone(this.getPhone())
                .address(this.getAddress())
                .addressDetail(this.getAddressDetail())
                .introduction(this.getIntroduction())
                .lat(this.getLat())
                .lng(this.getLng())
                .tags(toGuestHouseType())
                .area(Area.builder().areaName(this.getAreaName()).build())
                .build();
    }

    public GuestHouse toGuestHouse(String guestHouseUid) {
        return GuestHouse.builder()
                .uid(Long.parseLong(guestHouseUid))
                .guestHouseName(this.getGuestHouseName())
                .representativeUid(this.getRepresentativeUid())
                .email(this.getEmail())
                .phone(this.getPhone())
                .address(this.getAddress())
                .addressDetail(this.getAddressDetail())
                .introduction(this.getIntroduction())
                .lat(this.getLat())
                .lng(this.getLng())
                .tags(toGuestHouseType())
                .area(Area.builder().areaName(this.getAreaName()).build())
                .build();
    }
}
