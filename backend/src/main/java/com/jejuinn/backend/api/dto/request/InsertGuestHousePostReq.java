package com.jejuinn.backend.api.dto.request;

import com.jejuinn.backend.db.entity.GuestHouse;
import lombok.*;

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

    public GuestHouse toGuestHouse(){
        return GuestHouse.builder()
                .guestHouseName(this.getGuestHouseName())
                .representativeUid(this.getRepresentativeUid())
                .email(this.getEmail())
                .phone(this.getPhone())
                .address(this.getAddress())
                .addressDetail(this.getAddressDetail())
                .introduction(this.getIntroduction())
                .build();
    }
}
