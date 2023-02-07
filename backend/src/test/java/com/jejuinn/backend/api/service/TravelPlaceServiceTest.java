package com.jejuinn.backend.api.service;

import com.jejuinn.backend.db.entity.*;
import com.jejuinn.backend.db.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import javax.transaction.Transactional;

import java.util.Collections;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class TravelPlaceServiceTest {
    @Autowired
    TravelPlaceService travelPlaceService;
    @Autowired
    TravelPlaceReviewRepository travelPlaceReviewRepository;
    @Autowired
    TravelPlaceRepository travelPlaceRepository;

    @Test
    public void updateAvgStarRating(){
        TravelPlaceReview review = TravelPlaceReview.builder()
                .userUid(19L)
                .content("리뷰 입니다.")
                .starRating(1)
                .travelPlaceUid(4L)
                .build();
        travelPlaceReviewRepository.save(review);
        TravelPlace travelPlace = travelPlaceRepository.findById(review.getTravelPlaceUid()).get();
        travelPlaceService.updateReviewCountAndRating(review.getTravelPlaceUid(), review.getStarRating(), "INSERT");
        review.setStarRating(5);
        travelPlaceService.updateReviewCountAndRating(review.getTravelPlaceUid(), review.getStarRating(), "UPDATE");

        System.out.println(travelPlace.getStarRatingAvg());







    }

}