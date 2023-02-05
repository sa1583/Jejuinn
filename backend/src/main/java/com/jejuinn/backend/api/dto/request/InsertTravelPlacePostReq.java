package com.jejuinn.backend.api.dto.request;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.TravelPlace;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsertTravelPlacePostReq {

    @ApiModelProperty(name="명소 이름")
    @Size(min = 2, max=50)
    @NotNull
    private String name;

    @ApiModelProperty(name="명소 유형 (자연 or 놀거리 or 먹거리 or 볼거리)")
    @NotNull
    @Size(max = 10)
    private String category;

    @ApiModelProperty(name="명소 주소 (제주특별시 서귀포시 뭐뭐읍)")
    @NotNull
    @Size(max = 50)
    private String address;


    @ApiModelProperty(name="명소 단순 주소 ( 뭐뭐읍)")
    @NotNull
    @Size(max = 10)
    private String areaName;

    @ApiModelProperty(name="위도")
    @NotNull
    private double lat;

    @ApiModelProperty(name="경도")
    @NotNull
    private double lng;

    public TravelPlace toTravelPlace(){
        return TravelPlace.builder()
                .name(this.getName())
                .lat(this.getLat())
                .lng(this.getLng())
                .address(this.getAddress())
                .areaName(this.getAreaName())
                .category(this.getCategory())
                .build();
    }
}
