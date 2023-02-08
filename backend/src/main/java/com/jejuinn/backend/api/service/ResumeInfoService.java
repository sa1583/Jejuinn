package com.jejuinn.backend.api.service;

import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.db.repository.ResumeInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResumeInfoService {

    private final ResumeInfoRepository resumeInfoRepository;

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

}
