package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.TravelPlaceReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TravelPlaceReviewRepository extends JpaRepository<TravelPlaceReview, Long> {
    Optional<List<TravelPlaceReview>> findAllByTravelPlaceUid(Long travelPlaceUid);

    @Query("update TravelPlaceReview set likeCount = likeCount + 1 where uid = :reviewUid")
    void increaseLikeCount(@Param("reviewUid") Long reviewUid);

    @Query("update TravelPlaceReview set likeCount = likeCount - 1 where uid = :reviewUid")
    void decreaseLikeCount(@Param("reviewUid") Long reviewUid);
}
