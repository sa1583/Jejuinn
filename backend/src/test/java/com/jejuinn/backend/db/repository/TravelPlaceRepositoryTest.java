package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.service.TravelPlaceService;
import com.jejuinn.backend.db.entity.TravelPlace;
import com.jejuinn.backend.db.entity.TravelPlaceReview;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class TravelPlaceRepositoryTest {

    @Autowired
    TravelPlaceRepository travelPlaceRepository;
    @Autowired
    TravelPlaceService travelPlaceService;

    @Test
    public void updateDateTest(){
        TravelPlace travelPlace = TravelPlace.builder()
                .name("test name")
                .address("test address")
                .lat(33.143)
                .lng(143.111)
                .areaName("제주시")
                .category("놀거리")
                .build();
        travelPlaceRepository.save(travelPlace);

        System.out.println(travelPlace.getDateUpdated());

    }

    @Test
    public void addReviewTest(){
        TravelPlace travelPlace = TravelPlace.builder()
                .name("test name")
                .address("test address")
                .lat(33.143)
                .lng(143.111)
                .areaName("제주시")
                .category("놀거리")
                .build();
        travelPlaceRepository.save(travelPlace);

        String pre = String.valueOf(travelPlace.getDateUpdated());

        TravelPlaceReview review = TravelPlaceReview.builder()
                .starRating(4)
                .content("hi")
                .likeCount(0)
                .travelPlaceUid(1L)
                .userUid(1L).build();

        try{
            Thread.sleep(1000);
        }catch(InterruptedException e){
            e.printStackTrace();
        }

        travelPlaceService.updateReviewCountAndRating(travelPlace.getUid(), review.getStarRating(), "INSERT");



        assertThat(pre).isNotEqualTo(travelPlaceRepository.findById(travelPlace.getUid()).get().getDateUpdated().toString());

    }

}