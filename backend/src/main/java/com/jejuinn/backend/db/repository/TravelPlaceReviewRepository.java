package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.dto.response.travelplace.MyTravelPlaceReviewRes;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface TravelPlaceReviewRepository extends JpaRepository<TravelPlaceReview, Long> {
    Optional<List<TravelPlaceReview>> findAllByTravelPlaceUidOrderByDateCreatedDesc(Long travelPlaceUid);

    @Modifying
    @Query("update TravelPlaceReview set likeCount = likeCount + 1 where uid = :reviewUid")
    void increaseLikeCount(@Param("reviewUid") Long reviewUid);

    @Modifying
    @Query("update TravelPlaceReview set likeCount = likeCount - 1 where uid = :reviewUid")
    void decreaseLikeCount(@Param("reviewUid") Long reviewUid);

    @Query("select avg(r.starRating) from TravelPlaceReview r where r.travelPlaceUid = :travelPlaceUid")
    double getAvgStarRating(@Param("travelPlaceUid") Long travelPlaceUid);

    @Query("select new com.jejuinn.backend.api.dto.response.travelplace.MyTravelPlaceReviewRes(r.uid, r.dateCreated, t.name) from TravelPlaceReview r " +
            "left outer join TravelPlace t on r.travelPlaceUid = t.uid where r.userUid = :userUid")
    List<MyTravelPlaceReviewRes> findAllByUserUid(Long userUid);
}
