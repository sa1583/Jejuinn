package com.jejuinn.backend.api.dto.request.recommender;

import com.jejuinn.backend.api.dto.response.recommender.RecommendResumeDto;
import com.jejuinn.backend.api.dto.response.recommender.RecommendWorkDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GetSimilarityFlaskReq {

    private RecommendWorkDto work;

    private List<RecommendResumeDto> resumes;
}
