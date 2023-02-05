package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.TravelPlaceReview;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class TravelPlaceReviewRepositoryTest {
    @Autowired UserRepository userRepository;
    @Autowired TravelPlaceReviewRepository travelPlaceReviewRepository;

    @Test
    public void test(){
//        InsertReviewPostReq req = InsertReviewPostReq.builder().travelPlaceUid(1L).starRating(4).content("hihi").build();

        TravelPlaceReview review = TravelPlaceReview.builder()
                .starRating(4)
                .content("hi")
                .likeCount(0)
                .travelPlaceUid(1L)
                .userUid(1L).build();

//        TravelPlaceReview review1 = req.toTravelPlaceReview(user.get());
        TravelPlaceReview review2 = travelPlaceReviewRepository.save(review);

        assertThat(review2.getUid()).isEqualTo(review.getUid());
    }
}