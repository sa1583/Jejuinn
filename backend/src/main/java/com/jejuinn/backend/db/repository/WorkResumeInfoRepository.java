package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.dto.wrapper.ApplicantMapper;
import com.jejuinn.backend.db.entity.WorkResumeInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkResumeInfoRepository extends JpaRepository<WorkResumeInfo, Long> {

    @Query(value = "select ", nativeQuery = true)
    List<ApplicantMapper> getApplicant();
}
