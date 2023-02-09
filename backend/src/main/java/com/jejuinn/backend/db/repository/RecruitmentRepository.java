package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.dto.response.resumeinfo.MyApplicantRes;
import com.jejuinn.backend.db.entity.Recruitment;
import com.jejuinn.backend.db.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecruitmentRepository extends JpaRepository<Recruitment, Long> {
    List<Recruitment> findAllByGuestHouseUidOrderByDateCreatedDesc(Long guestHouseUid);

    @Query("select w from Recruitment r left outer join Work w on r.uid = w.recruitment.uid where r.guestHouseUid = :guestHouseUid")
    List<Work> findWorkByGuestHouseUid(@Param("guestHouseUid") Long guestHouseUid);
    /*@Query("select new com.jejuinn.backend.api.dto.response.resumeinfo(g.guestHouseName, r.title, r.uid) from Recruitment r " +
            "left outer join GuestHouse g on r.guestHouseUid = g.uid " +
            "where r.uid in (:uids)")
    List<MyApplicantRes> findAllByRecruitmentUid(@Param("uids") List<Long> recruitmentUids);*/
}
