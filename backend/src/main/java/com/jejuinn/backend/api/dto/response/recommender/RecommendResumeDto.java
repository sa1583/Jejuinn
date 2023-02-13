package com.jejuinn.backend.api.dto.response.recommender;

import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.PersonType;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class RecommendResumeDto {
    private Long resumeInfoUid;
    private Long userUid;
    private String content;
    private List<String> guestHouseTypes;
    private List<String> personTypes;
    private double score;

    @QueryProjection
    public RecommendResumeDto(Long resumeInfoUid, Long userUid, String content, String guestHouseType) {
        this.resumeInfoUid = resumeInfoUid;
        this.userUid = userUid;
        this.content = content;
        if(guestHouseType != null || !guestHouseType.isEmpty()){
            this.guestHouseTypes = List.of(guestHouseType.split(","));
        }
    }
}
