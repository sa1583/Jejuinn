package com.jejuinn.backend.api.service;

import com.jejuinn.backend.api.dto.request.recruitment.InsertWorkResumeInfoPostReq;
import com.jejuinn.backend.api.dto.response.recruitment.MyApplicantDetailRes;
import com.jejuinn.backend.api.dto.response.resumeinfo.ResumeInfoDetail;
import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.entity.Work;
import com.jejuinn.backend.db.entity.WorkResumeInfo;
import com.jejuinn.backend.db.repository.ResumeInfoRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.db.repository.WorkRepository;
import com.jejuinn.backend.exception.NoContentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResumeInfoService {

    private final ResumeInfoRepository resumeInfoRepository;
    private final WorkRepository workRepository;
    private final UserRepository userRepository;

    public List<MyApplicantDetailRes> getMyApplicant(List<Long> resumeInfoUids) {
        List<MyApplicantDetailRes> result = new ArrayList<>();
        for(Long resumeInfoUid : resumeInfoUids) {
            Optional<ResumeInfo> resumeInfo = resumeInfoRepository.findById(resumeInfoUid);
            Optional<User> user = userRepository.findById(resumeInfo.get().getUser().getUid());
            if(user.isPresent()) {
                result.add(MyApplicantDetailRes.toMyApplicantDetailRes(resumeInfo.get(), user.get()));
            }
        }
        return result;
    }

    public MyApplicantDetailRes getMyApplicant(Long resumeInfoUid) {
        Optional<ResumeInfo> resumeInfo = resumeInfoRepository.findById(resumeInfoUid);
        Optional<User> user = userRepository.findById(resumeInfo.get().getUser().getUid());
        if(user.isPresent()) {
            return MyApplicantDetailRes.toMyApplicantDetailRes(resumeInfo.get(), user.get());
        }
        return null;
    }

    @Transactional
    public ResumeInfo update(Long userUid) {
        Optional<ResumeInfo> temp = resumeInfoRepository.findByUserUidAndIsDeletedFalse(userUid);
        ResumeInfo resumeInfo = null;
        if(temp.isPresent()) {
            resumeInfo = temp.get();
            boolean autoApply = resumeInfo.isAutoApply();
            resumeInfo.setAutoApply(!autoApply);
            return resumeInfo;
        } else {
            return null;
        }

    }

    public WorkResumeInfo insertWorkResumeInfo(InsertWorkResumeInfoPostReq insertWorkResumeInfoPostReq) {
        Optional<ResumeInfo> resumeInfo = resumeInfoRepository.findByUserUidAndIsDeletedFalse(insertWorkResumeInfoPostReq.getUserUid());
        Optional<Work> work = workRepository.findById(insertWorkResumeInfoPostReq.getWorkUid());
        if(resumeInfo.isPresent() && work.isPresent()) {
            return WorkResumeInfo.builder()
                    .resumeInfo(resumeInfo.get())
                    .work(work.get())
                    .build();
        }
        return null;
    }

}
