package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Work;
import org.kurento.client.internal.server.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface WorkRepository extends JpaRepository<Work, Long> {
    Page<Work> findAll(Pageable pageable);

    List<Work> findAllByRecruitmentUid(Long recruitmentUid);

    @Query(value = "select g.representative_uid from works w left outer join recruitments r on w.recruitment_uid = r.uid " +
            "left outer join guest_houses g on g.uid = r.guest_house_uid where w.uid = :workUid", nativeQuery = true)
    Long findUserUidByWorkUid(@Param("workUid")Long workUid);

    @Query("select w from Work w left outer join Recruitment r on w.recruitment.uid = r.uid where w.entryDate >= :entryDate " +
            "and r.guestHouseUid in (:guestHouseUidList)")
    Page<Work> findByGuestHouseUidAndEntryDate(@Param("guestHouseUidList") List<Long> guestHouseUidList,
                                               @Param("entryDate") LocalDate entryDate, Pageable pageable);

    @Query("select g.uid from Work w left outer join Recruitment r on w.recruitment.uid = r.uid left outer join " +
            "GuestHouse g on g.uid = r.guestHouseUid where w.uid = :workUid")
    Long findGuestHouseUidByWorkUid(@Param("workUid") Long workUid);
}
