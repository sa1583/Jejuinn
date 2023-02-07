package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.StaffRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface StaffRecordRepository extends JpaRepository<StaffRecord, Long> {
    List<StaffRecord> findAllByGuestHouseUidOrderByStartDateDesc(Long guestHouseUid);
    List<StaffRecord> findAllByGuestHouseUidAndEndDateOrderByStartDateDesc(Long guestHouseUid, LocalDate endDate);
}
