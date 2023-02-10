package com.jejuinn.backend.api.dto.response.recommender;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.PersonType;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class RecommendResumeDto {
    private Long resumeInfoUid;
    private List<String> guestHouseTypes;
    private List<String> personTypes;

    @QueryProjection
    public RecommendResumeDto(Long resumeInfoUid, String guestHouseType) {
        this.resumeInfoUid = resumeInfoUid;
        if(guestHouseType != null || !guestHouseType.isEmpty()){
            this.guestHouseTypes = List.of(guestHouseType.split(","));
        }
    }
}
