package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.TravelPlaceReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TravelPlaceReviewRepository extends JpaRepository<TravelPlaceReview, Long> {
    Optional<List<TravelPlaceReview>> findAllByTravelPlaceUid(Long travelPlaceUid);
}
