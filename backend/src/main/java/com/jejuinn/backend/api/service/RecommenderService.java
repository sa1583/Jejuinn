package com.jejuinn.backend.api.service;

import com.jejuinn.backend.api.dto.request.recommender.GetSimilarityFlaskReq;
import com.jejuinn.backend.api.dto.response.comment.GetSimilarityFlaskRes;
import com.jejuinn.backend.api.dto.response.recommender.RecommendResumeDto;
import com.jejuinn.backend.api.dto.response.recommender.RecommendWorkDto;
import com.jejuinn.backend.api.dto.search.NaverLocalSearchRes;
import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.db.repository.RecommendRepositorySupport;
import com.jejuinn.backend.db.repository.ResumeInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommenderService {
    private final ResumeInfoRepository resumeInfoRepository;
    private final RecommendRepositorySupport recommendRepositorySupport;

    public RecommendWorkDto getWorkInfo(Long workUid) {
        return recommendRepositorySupport.getWorkInfo(workUid);
    }

    public List<RecommendResumeDto> getResumeInfo(RecommendWorkDto request){
        List<RecommendResumeDto> resumes = recommendRepositorySupport.getResumeInfo(request);
        for (RecommendResumeDto resume : resumes) {
            Long uid = resume.getResumeInfoUid();
            ResumeInfo resumeInfo = resumeInfoRepository.findById(uid).get();
            List<String> list = resumeInfo.getPersonTypes().stream().map(personType -> personType.getType()).collect(Collectors.toList());
            resume.setPersonTypes(list);
        }
        return resumes;
    }

    public GetSimilarityFlaskReq getScoreFromFlask(RecommendWorkDto recommendWorkDto, List<RecommendResumeDto> recommendResumeDto) {
        log.info("유사도 체크 시작!");
        GetSimilarityFlaskReq reqToFlask = new GetSimilarityFlaskReq(recommendWorkDto, recommendResumeDto);

        HttpEntity<GetSimilarityFlaskReq> entity = new HttpEntity<>(reqToFlask);

        String url = "http://localhost:5000/sim";
//        String url = "https://jejuinn.com/sim";

        var uri = UriComponentsBuilder
                .fromUriString(url)
                .build()
                .encode()
                .toUri();

        var responseType = new ParameterizedTypeReference<GetSimilarityFlaskReq>(){};

        var responseEntity = new RestTemplate()
                .exchange(
                        uri,
                        HttpMethod.POST,
                        entity,
                        responseType
                );
        GetSimilarityFlaskReq resumes = responseEntity.getBody();
        log.info("완료!!!");
        return resumes;
    }
}
