package com.jejuinn.backend.api.service;

import com.jejuinn.backend.db.entity.TravelPlaceReview;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.repository.TravelPlaceRepository;
import com.jejuinn.backend.db.repository.TravelPlaceReviewRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.exception.DuplicateDataException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TravelPlaceReviewService {
    private final UserRepository userRepository;
    private final TravelPlaceRepository travelPlaceRepository;
    private final TravelPlaceReviewRepository travelPlaceReviewRepository;

    @Transactional
    public void addLike(final Long userUid, Long reviewUid) {
        Optional<User> user = userRepository.findById(userUid);

        for (TravelPlaceReview like : user.get().getLikes()) {
            if(like.getUid() == reviewUid)
                throw new DuplicateDataException("이미 좋아요를 누른 리뷰 입니다.");
        }
        travelPlaceReviewRepository.increaseLikeCount(reviewUid);
        user.get().getLikes().add(TravelPlaceReview.builder()
                .uid(reviewUid).build());
    }

    @Transactional
    public void deleteLike(final Long userUid, Long reviewUid) {
        User user = userRepository.findById(userUid).get();
        List<TravelPlaceReview> review = user.getLikes();

        for (int i = 0; i < review.size(); i++) {
            if(review.get(i).getUid() == reviewUid){
                travelPlaceReviewRepository.decreaseLikeCount(reviewUid);
                review.remove(i);
                user.setLikes(review);
                return;
            }
        }
        throw new DuplicateDataException("좋아요를 누른 리뷰가 아닙니다.");
    }
}
