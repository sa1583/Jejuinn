package com.jejuinn.backend.api.service;

import com.jejuinn.backend.db.entity.TravelPlace;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import com.jejuinn.backend.db.repository.TravelPlaceRepository;
import com.jejuinn.backend.db.repository.TravelPlaceReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TravelPlaceService {
    private final TravelPlaceRepository travelPlaceRepository;
    private final TravelPlaceReviewRepository travelPlaceReviewRepository;

    @Transactional
    public void updateReviewCountAndRating(final Long uid, int starRating, String method) {
        TravelPlace travelPlace = travelPlaceRepository.findById(uid)
                .orElseThrow(() -> new UsernameNotFoundException("데이터베이스에서 찾을 수 없습니다."));
        int count = travelPlace.getReviewCount();
        double avg = travelPlace.getStarRatingAvg();
        if(method.equals("INSERT")){
            avg = (avg*count+starRating)/(count+1);
            count++;
        }
        else if(method.equals("UPDATE")){
            System.out.println("hi");
            avg = travelPlaceReviewRepository.getAvgStarRating(uid);
        }
        travelPlace.setReviewCount(count);
        travelPlace.setDateUpdated(LocalDateTime.now());
        travelPlace.setStarRatingAvg(avg);
    }
}
