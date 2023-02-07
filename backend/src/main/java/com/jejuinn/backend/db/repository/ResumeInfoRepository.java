package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.ResumeInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeInfoRepository extends JpaRepository<ResumeInfo, Long> {
    Optional<ResumeInfo> findByUserUidAndIsDeletedFalse(Long userUid);
}
