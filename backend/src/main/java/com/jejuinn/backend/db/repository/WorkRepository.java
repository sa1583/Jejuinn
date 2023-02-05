package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Work;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkRepository extends JpaRepository<Work, Long> {
    Page<Work> findAll(Pageable pageable);

    List<Work> findAllByRecruitmentUid(Long recruitmentUid);
}
