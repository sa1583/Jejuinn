package com.jejuinn.backend.api.service;

import com.jejuinn.backend.api.dto.response.resumeinfo.MyApplicantRes;
import com.jejuinn.backend.db.repository.RecruitmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecruitmentService {

    private RecruitmentRepository recruitmentRepository;

    /*public List<MyApplicantRes> getMyApplicant(List<Long> recruitmentUids) {
        recruitmentRepository
    }*/
}
