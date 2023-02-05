package com.jejuinn.backend.api.service;

import com.jejuinn.backend.db.entity.TravelPlaceReview;
import com.jejuinn.backend.db.repository.TravelPlaceReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class TravelPlaceReviewService {
    private final TravelPlaceReviewRepository travelPlaceReviewRepository;

    @Transactional
    public void addLike(final Long uid) {
        TravelPlaceReview review = travelPlaceReviewRepository.findById(uid)
                .orElseThrow(() -> new UsernameNotFoundException("데이터베이스에서 찾을 수 없습니다."));
        review.setLikeCount(review.getLikeCount()+1);
    }
}
