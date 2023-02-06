package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.StaffRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffRecordRepository extends JpaRepository<StaffRecord, Long> {
    List<StaffRecord> findAllByGuestHouseUidAndIsWorking(Long guestHouseUid, boolean isWorking);
}
