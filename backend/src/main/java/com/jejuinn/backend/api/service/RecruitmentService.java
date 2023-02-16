package com.jejuinn.backend.api.service;

import com.jejuinn.backend.api.dto.response.resumeinfo.MyApplicantRes;
import com.jejuinn.backend.api.service.s3.S3Uploader;
import com.jejuinn.backend.db.entity.Recruitment;
import com.jejuinn.backend.db.entity.Work;
import com.jejuinn.backend.db.entity.WorkResumeInfo;
import com.jejuinn.backend.db.repository.ImageRepository;
import com.jejuinn.backend.db.repository.RecruitmentRepository;
import com.jejuinn.backend.db.repository.WorkResumeInfoRepository;
import com.jejuinn.backend.exception.BadRequestException;
import com.jejuinn.backend.exception.UnAuthorizationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecruitmentService {

    private final ImageRepository imageRepository;
    private final WorkResumeInfoRepository workResumeInfoRepository;
    private final UserService userService;
    private final RecruitmentRepository recruitmentRepository;
    private final S3Uploader s3Uploader;
    private static final String RECRUITMENT_TYPE = "RECRUITMENT";

    public void deleteRecruitment(Long recruitmentUid, Long userUid) {
        Optional<List<Long>> list = imageRepository.findUidByPostTypeAndPostUid(RECRUITMENT_TYPE, recruitmentUid);
        System.out.println("여기까지 옴");
        Long writerUid = recruitmentRepository.findUserUidByRecruitmentUid(recruitmentUid);
        Recruitment recruitment = recruitmentRepository.findById(recruitmentUid).get();
        if(!Objects.equals(userUid, writerUid)) throw new UnAuthorizationException("작성자가 아닙니다.");
        for(Work work : recruitment.getWorks()) {
            workResumeInfoRepository.deleteByWorkUid(work.getUid());
        }
        recruitmentRepository.deleteById(recruitmentUid);
        for(Long uid : list.get()) {
            try {
                s3Uploader.delete(uid);
            } catch (IOException e) {
                e.printStackTrace();
                throw new BadRequestException("잘못된 접근입니다.");
            }
        }
    }
}
