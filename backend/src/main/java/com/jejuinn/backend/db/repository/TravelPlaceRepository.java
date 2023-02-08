package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.TravelPlace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelPlaceRepository extends JpaRepository<TravelPlace, Long> {
    Page<TravelPlace> findAllByOrderByDateUpdatedDesc(Pageable pageable);
}
