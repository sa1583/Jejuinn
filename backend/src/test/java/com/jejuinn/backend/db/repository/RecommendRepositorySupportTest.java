package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.dto.response.recommender.RecommendResumeDto;
import com.jejuinn.backend.api.dto.response.recommender.RecommendWorkDto;
import com.jejuinn.backend.api.dto.response.recommender.TestDto;
import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.ResumeInfo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class RecommendRepositorySupportTest {
    @Autowired RecommendRepositorySupport recommendRepositorySupport;
    @Autowired ResumeInfoRepository resumeInfoRepository;


    @Test
    public void getWorkInfoTest(){
        RecommendWorkDto work = recommendRepositorySupport.getWorkInfo(7L);
        System.out.println(work.getWorkName());
        for (String s : work.getGuestHouseType()) {
            System.out.println(s);
        }
    }

    @Test
    public void test(){
       List<PersonType> personTypes = recommendRepositorySupport.projectionTest(1L);
       System.out.println(personTypes.size());
    }

    @Test
    public void getResumeList(){
        RecommendWorkDto work = recommendRepositorySupport.getWorkInfo(7L);
        List<RecommendResumeDto> resumes = recommendRepositorySupport.getResumeInfo(work);
        for (RecommendResumeDto resume : resumes) {
            Long uid = resume.getResumeInfoUid();
            ResumeInfo resumeInfo = resumeInfoRepository.findById(uid).get();
            List<String> list = resumeInfo.getPersonTypes().stream().map(personType -> personType.getType()).collect(Collectors.toList());
            resume.setPersonTypes(list);
        }

        for (RecommendResumeDto resume : resumes) {
            System.out.println("================================================");
            System.out.println(resume.getResumeInfoUid());
            for (int i = 0; i < resume.getPersonTypes().size(); i++) {
                System.out.println(resume.getPersonTypes().get(i));
            }
        }
    }

}