package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.dto.response.recruitment.MyApplyList;
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

    @Query(value = "select g.representative_uid from recruitments r left outer join guest_houses g on r.guest_house_uid = g.uid" +
            " where r.uid = :recruitmentUid", nativeQuery = true)
    Long findUserUidByRecruitmentUid(@Param("recruitmentUid") Long recruitmentUid);

    @Query("select w from GuestHouse g left outer join Recruitment r on g.uid = r.guestHouseUid " +
            "left outer join Work w on w.recruitment.uid = r.uid where g.uid = :guestHouseUid")
    List<Work> findAllWorkByGuestHouseUid(@Param("guestHouseUid") Long guestHouseUid);

    @Query("select new com.jejuinn.backend.api.dto.response.recruitment.MyApplyList(g.uid, r.uid, g.guestHouseName, r.title, wri.isRead) " +
            "from GuestHouse g left outer join" +
            " Recruitment r on g.uid = r.guestHouseUid left outer join Work w on r.uid = w.recruitment.uid left outer join " +
            "WorkResumeInfo wri on wri.work.uid = w.uid left outer join ResumeInfo ri on wri.resumeInfo.uid = ri.uid" +
            " where ri.user.uid = :userUid")
    List<MyApplyList> findMyApplyListByUserUid(@Param("userUid") Long userUid);
}
