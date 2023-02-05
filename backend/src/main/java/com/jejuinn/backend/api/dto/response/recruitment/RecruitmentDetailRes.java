package com.jejuinn.backend.api.dto.response.recruitment;

import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.entity.Recruitment;
import com.jejuinn.backend.db.entity.Work;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RecruitmentDetailRes {
    private Recruitment recruitment;
    private List<WorkDetailRes> works;
    private List<Image> images;

    public static RecruitmentDetailRes of(Recruitment recruitment, List<WorkDetailRes> works, List<Image> images) {
        return RecruitmentDetailRes.builder()
                .recruitment(recruitment)
                .works(works)
                .images(images)
                .build();
    }
}
