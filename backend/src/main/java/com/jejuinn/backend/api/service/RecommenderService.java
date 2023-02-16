package com.jejuinn.backend.api.service;

import com.jejuinn.backend.api.dto.request.recommender.GetSimilarityFlaskReq;
import com.jejuinn.backend.api.dto.response.recommender.RecommendResumeDto;
import com.jejuinn.backend.api.dto.response.recommender.RecommendWorkDto;
import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.db.repository.RecommendRepositorySupport;
import com.jejuinn.backend.db.repository.ResumeInfoRepository;
import com.jejuinn.backend.db.repository.StaffRecordRepository;
import com.jejuinn.backend.exception.NoContentException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommenderService {
    private final ResumeInfoRepository resumeInfoRepository;
    private final RecommendRepositorySupport recommendRepositorySupport;
    private final StaffRecordRepository staffRecordRepository;

    public RecommendWorkDto getWorkInfo(Long workUid) {
        return recommendRepositorySupport.getWorkInfo(workUid)
                .orElseThrow(() -> new NoContentException());
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

    public List<RecommendResumeDto> getScoreFromFlask(RecommendWorkDto recommendWorkDto, List<RecommendResumeDto> recommendResumeDto) {
        log.info("유사도 체크 시작!");
        GetSimilarityFlaskReq reqToFlask = new GetSimilarityFlaskReq(recommendWorkDto, recommendResumeDto);

        HttpEntity<GetSimilarityFlaskReq> entity = new HttpEntity<>(reqToFlask);

//        String url = "http://localhost:5000/sim"; // 로컬 테스트용
//        String url = "http://localhost:8082/sim"; // 로컬 도커 테스트용
        String url = "https://jejuinn.com/sim"; // ec2 서버

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
        GetSimilarityFlaskReq result = responseEntity.getBody();
        log.info("완료!!!");

        log.info("근무 이력 검색!!!");
        result.getResumes().stream().map(resumeDto -> {
            Long userUid = resumeDto.getUserUid();
            Long cnt = staffRecordRepository.countByUserUid(userUid);
            resumeDto.setScore(resumeDto.getScore()+cnt);
            return resumeDto;
        } ).collect(Collectors.toList());

        List<RecommendResumeDto> resumes = result.getResumes();
        Collections.sort(resumes, (a,b) -> (int) (b.getScore() - a.getScore()));
        return resumes;
    }
}
