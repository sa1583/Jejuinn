package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.GuestHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GuestHouseRepository extends JpaRepository<GuestHouse, Long> {
    public Long countBy();

    List<GuestHouse> findAllByRepresentativeUid(Long representativeUid);

    @Query("select g from GuestHouse g where g.uid in (:guestHouseUids)")
    List<GuestHouse> findAllByGuestHouseUid(@Param("guestHouseUids") List<Long> guestHouseUids);

}
