package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.WorkResumeInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkResumeInfoRepository extends JpaRepository<WorkResumeInfo, Long> {

    @Query("select w.resumeInfo.uid from WorkResumeInfo w where w.work.uid = :workUid")
    List<Long> findResumeInfoUidByWorkUid(@Param("workUid") Long workUid);

    @Query("select w from WorkResumeInfo w where w.resumeInfo.uid = :resumeInfoUid and w.work.uid = :workUid")
    WorkResumeInfo findByResumeInfoUidAndWorkUid(@Param("resumeInfoUid") Long resumeInfoUid, @Param("workUid") Long workUid);

    void deleteByWorkUid(Long workUid);
}
