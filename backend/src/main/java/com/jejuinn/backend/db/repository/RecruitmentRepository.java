package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Recruitment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecruitmentRepository extends JpaRepository<Recruitment, Long> {
    List<Recruitment> findAllByGuestHouseUidOrderByDateCreatedDesc(Long guestHouseUid);
}
