package com.jejuinn.backend.api.service;

import com.jejuinn.backend.db.entity.TravelPlace;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import com.jejuinn.backend.db.repository.TravelPlaceRepository;
import com.jejuinn.backend.db.repository.TravelPlaceReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class TravelPlaceService {
    private final TravelPlaceRepository travelPlaceRepository;

    @Transactional
    public void updateReviewCountAndRating(final Long uid, int starRating) {
        TravelPlace travelPlace = travelPlaceRepository.findById(uid)
                .orElseThrow(() -> new UsernameNotFoundException("데이터베이스에서 찾을 수 없습니다."));
        int count = travelPlace.getReviewCount();
        double avg = travelPlace.getStarRatingAvg();
        avg = (avg*count+starRating)/(count+1);

        travelPlace.setReviewCount(count+1);
        travelPlace.setStarRatingAvg(avg);
    }
}
