package com.jejuinn.backend.api.service;

import com.jejuinn.backend.api.dto.request.recruitment.InsertWorkResumeInfoPostReq;
import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.db.entity.Work;
import com.jejuinn.backend.db.entity.WorkResumeInfo;
import com.jejuinn.backend.db.repository.ResumeInfoRepository;
import com.jejuinn.backend.db.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResumeInfoService {

    private final ResumeInfoRepository resumeInfoRepository;
    private final WorkRepository workRepository;

    @Transactional
    public ResumeInfo update(Long userUid) {
        Optional<ResumeInfo> temp = resumeInfoRepository.findByUserUidAndIsDeletedFalse(userUid);
        ResumeInfo resumeInfo = null;
        if(temp.isPresent()) {
            resumeInfo = temp.get();
        }
        boolean autoApply = resumeInfo.isAutoApply();
        resumeInfo.setAutoApply(!autoApply);
        return resumeInfo;
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
