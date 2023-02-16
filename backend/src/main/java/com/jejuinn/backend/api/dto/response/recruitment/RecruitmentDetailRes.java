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
    private Long writerUid;
    private Recruitment recruitment;
    private List<WorkRes> works;
    private List<Image> images;

    public static RecruitmentDetailRes of(Recruitment recruitment, List<WorkRes> works, List<Image> images, Long writerUid) {
        return RecruitmentDetailRes.builder()
                .recruitment(recruitment)
                .writerUid(writerUid)
                .works(works)
                .images(images)
                .build();
    }
}
