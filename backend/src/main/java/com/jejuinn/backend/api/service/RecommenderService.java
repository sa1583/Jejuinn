package com.jejuinn.backend.api.service;

import com.jejuinn.backend.api.dto.response.recommender.RecommendResumeDto;
import com.jejuinn.backend.api.dto.response.recommender.RecommendWorkDto;
import com.jejuinn.backend.db.entity.Recruitment;
import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.db.entity.Work;
import com.jejuinn.backend.db.repository.GuestHouseRepository;
import com.jejuinn.backend.db.repository.RecommendRepositorySupport;
import com.jejuinn.backend.db.repository.ResumeInfoRepository;
import com.jejuinn.backend.db.repository.WorkRepository;
import com.jejuinn.backend.exception.NoContentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
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
}
