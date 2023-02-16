package com.jejuinn.backend.api.dto.request.guesthouse;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.GuestHouse;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsertGuestHousePostReq {

    @NotNull
    private String guestHouseName;

    @NotNull
    private Long representativeUid;

    private String email;

    private String phone;

    private String address;

    private String addressDetail;

    private String introduction;

    @NotNull
    private double lat;

    @NotNull
    private double lng;

    private List<String> guestHouseTypes;

    @NotNull
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

    public GuestHouse toGuestHouse(Long guestHouseUid) {
        return GuestHouse.builder()
                .uid(guestHouseUid)
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
