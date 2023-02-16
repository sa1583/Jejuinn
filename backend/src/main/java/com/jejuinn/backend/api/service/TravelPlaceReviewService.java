package com.jejuinn.backend.api.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.jejuinn.backend.api.dto.request.UpdateReviewPutReq;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.repository.TravelPlaceRepository;
import com.jejuinn.backend.db.repository.TravelPlaceReviewRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.db.repository.WorkResumeInfoRepository;
import com.jejuinn.backend.exception.DuplicateDataException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TravelPlaceReviewService {
    private final WorkResumeInfoRepository workResumeInfoRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final TravelPlaceRepository travelPlaceRepository;
    private final TravelPlaceReviewRepository travelPlaceReviewRepository;

    @Transactional
    public TravelPlaceReview update(UpdateReviewPutReq reviewPutReq, Long reviewUid){
        TravelPlaceReview review = travelPlaceReviewRepository.findById(reviewUid).get();
        review.setStarRating(reviewPutReq.getStarRating());
        review.setContent(reviewPutReq.getContent());
        return review;
    }

    @Transactional
    public void addLike(final Long userUid, Long reviewUid) {
        Optional<User> user = userRepository.findById(userUid);

        for (TravelPlaceReview like : user.get().getLikes()) {
            if(Objects.equals(like.getUid(), reviewUid))
                throw new DuplicateDataException("이미 좋아요를 누른 리뷰 입니다.");
        }
        travelPlaceReviewRepository.increaseLikeCount(reviewUid);
        Long writerUid = getUserUidFromReviewUid(reviewUid);
        userService.updateSugarContent(0.2, writerUid);

        user.get().getLikes().add(TravelPlaceReview.builder()
                .uid(reviewUid).build());
    }

    @Transactional
    public void deleteLike(final Long userUid, Long reviewUid) {
        User user = userRepository.findById(userUid).get();
        List<TravelPlaceReview> review = user.getLikes();
        for (int i = 0; i < review.size(); i++) {
            if(Objects.equals(review.get(i).getUid(), reviewUid)){
                travelPlaceReviewRepository.decreaseLikeCount(reviewUid);
                Long writerUid = getUserUidFromReviewUid(reviewUid);
                userService.updateSugarContent(-0.2, writerUid);
                review.remove(i);
                user.setLikes(review);
                return;
            }
        }
        throw new DuplicateDataException("좋아요를 누른 리뷰가 아닙니다.");
    }

    public Long getUserUidFromReviewUid(Long reviewUid){
        TravelPlaceReview review = travelPlaceReviewRepository.findById(reviewUid)
                .orElseThrow( () -> new NotFoundException("리뷰 등록자가 없습니다."));
        return review.getUserUid();
    }
}
