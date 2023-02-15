package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.InsertReviewPostReq;
import com.jejuinn.backend.api.dto.request.UpdateReviewPutReq;
import com.jejuinn.backend.api.dto.response.travelplace.*;
import com.jejuinn.backend.api.service.TravelPlaceReviewService;
import com.jejuinn.backend.api.service.TravelPlaceService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.api.service.s3.S3Uploader;
import com.jejuinn.backend.api.service.social.NaverService;
import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.repository.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@Api(tags = "관광지 리뷰 관련 기능 API")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final TravelPlaceService travelPlaceService;
    private final TravelPlaceReviewService travelPlaceReviewService;
    private final TravelPlaceRepository travelPlaceRepository;
    private final TravelPlaceRepositorySupport travelPlaceRepositorySupport;
    private final TravelPlaceReviewRepository travelPlaceReviewRepository;
    private static final String TRAVEL_PLACE = "TRAVEL_PLACE";
    private static final String REVIEW_TYPE = "REVIEW";
    private final ImageRepository imageRepository;
    private final NaverService naverService;
    private final S3Uploader s3Uploader;

    @GetMapping("/api/travel-place/{travelPlaceUid}/reviews")
    @ApiOperation(value = "관광지의 리뷰들 조회", notes = "<strong>관광지의 uid</strong>를 입력받아 리뷰 리스트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(관광지 정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getReviews(@PathVariable Long travelPlaceUid){
        Optional<List<TravelPlaceReview>> reviews = travelPlaceReviewRepository.findAllByTravelPlaceUidOrderByDateCreatedDesc(travelPlaceUid);

        List<ImgUrlAndReviewUid> reviewWithImg = null;
        if(reviews.isPresent()){
            reviewWithImg = reviews.get().stream().map(travelPlaceReview
                            -> ImgUrlAndReviewUid.of(imageRepository.findImgPathByPostTypeAndPostUid(REVIEW_TYPE, travelPlaceReview.getUid()),
                                    travelPlaceReview.getUid())).collect(Collectors.toList());
        }
        return ResponseEntity.status(200).body(reviewWithImg);

    }


    @PostMapping("/auth/travel-place/reviews")
    @ApiOperation(value = "관광지 리뷰 추가", notes = "<strong>리뷰의 uid</strong>를 입력받아 리뷰를 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(관광지 정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertReview(@RequestPart(value = "uploadImages", required = false) List<MultipartFile> uploadImages,
                                          @Valid @RequestPart("review") InsertReviewPostReq req,
                                          HttpServletRequest request){
        log.info("관광지 리뷰 추가 요청");
        log.info("info {}", req.toString());
        Long userUid = userService.getUserUidFromAccessToken(request);

        // 리뷰 저장
        TravelPlaceReview review = travelPlaceReviewRepository.save(req.toTravelPlaceReview(userUid));

        // 사용자 평점 업데이트
        userService.updateSugarContent(0.1, userUid);

        // 관광지 평점 업데이트
        travelPlaceService.updateReviewCountAndRating(review.getTravelPlaceUid(), review.getStarRating(), "INSERT");

        // 사진 저장
        try {
            s3Uploader.uploadImages(uploadImages, REVIEW_TYPE, review.getUid());
        } catch (IOException e) {
            log.error("AWS S3 이미지 저장 에러");
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }
        Long reviewUid = review.getUid();
        return ResponseEntity.status(200).body(
                reviewUid
        );
    }

    @GetMapping("/api/travel-place/reviews/{reviewUid}")
    @ApiOperation(value = "관광지 리뷰 상세 보기", notes = "<strong>리뷰의 uid</strong>를 입력받아 리뷰를 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(관광지 정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getTravelPlaceReview(@PathVariable Long reviewUid){
        log.info("관광지 리뷰 상세 보기 : {}", reviewUid);
        return ResponseEntity.status(200)
                .body(travelPlaceReviewRepository.findById(reviewUid)
                        .map(review -> ReviewDetailRes.of(review,
                                userRepository.findById(review.getUserUid()),
                                imageRepository.findAllByPostTypeAndPostUid(REVIEW_TYPE, review.getUid())
                                )));
    }

    @DeleteMapping("/auth/travel-place/reviews/{reviewUid}")
    @ApiOperation(value = "관광지 리뷰 삭제", notes = "<strong>리뷰의 uid</strong>를 입력받아 리뷰를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(관광지 정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteTravelPlaceReview(@PathVariable Long reviewUid, HttpServletRequest request){
        log.info("관광지 리뷰 삭제 시작");
        Optional<TravelPlaceReview> review = travelPlaceReviewRepository.findById(reviewUid);
        // 리뷰가 없다면
        if(review.isEmpty()) {
            log.info("관광지 리뷰 정보가 없습니다.");
            return ResponseEntity.status(400).build();
        }

        Long userUid = userService.getUserUidFromAccessToken(request);

        // 리뷰의 user uid와 현재 접속한 사용자의 uid가 다르다면
        if(review.get().getUserUid() != userUid) {
            log.info("관광지 리뷰의 작성자와 현재 이용자가 다릅니다.");
            return ResponseEntity.status(401).build();
        }

        List<Long> list = imageRepository.findAllByPostTypeAndPostUid(REVIEW_TYPE, reviewUid)
                .stream().map(image -> image.getUid()).collect(Collectors.toList());

        try {
            s3Uploader.deleteImages(list);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }

        travelPlaceService.deleteReview(review);

        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/travel-place/reviews/{reviewUid}")
    @ApiOperation(value = "관광지 리뷰 수정", notes = "<strong>리뷰의 uid</strong>와 내용을 입력받아 리뷰를 수정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(관광지 정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateTravelPlaceReview(@RequestPart(value = "uploadImages", required = false) List<MultipartFile> uploadImages,
                                                      @RequestPart("reviewContent") UpdateReviewPutReq req,
                                                      @RequestPart(value = "deleteImages", required = false) List<Long> list,
                                                      @PathVariable Long reviewUid){
        log.info("관광지 리뷰 수정 요청");



        // 리뷰 저장

        TravelPlaceReview review = travelPlaceReviewService.update(req, reviewUid);
        log.info("리뷰 내용 업데이트 완료");

        // 관광지 평점 수정
        travelPlaceService.updateReviewCountAndRating(review.getTravelPlaceUid(), review.getStarRating(), "UPDATE");
        log.info("관광지 평점 수정 완료");

        // 사진 삭제
        try {
            if(list != null && !list.isEmpty()){
                s3Uploader.deleteImages(list);
                log.info("사진 삭제 완료");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }

        // 사진 저장
        try {
            if (uploadImages != null && !uploadImages.isEmpty()){
                s3Uploader.uploadImages(uploadImages, REVIEW_TYPE, review.getUid());
                log.info("사진 저장 완료");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }

        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/travel-place/reviews/{reviewUid}/like")
    @ApiOperation(value = "관광지 리뷰 좋아요 등록", notes = "<strong>리뷰의 uid</strong>와 내용을 입력받아 사용자가 좋아요를 등록합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(좋아요 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(이미 좋아요를 누른 리뷰)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> likeTravelPlaceReview(@PathVariable Long reviewUid, HttpServletRequest request){
        Long userUid = userService.getUserUidFromAccessToken(request);
        travelPlaceReviewService.addLike(userUid, reviewUid);
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/travel-place/reviews/{reviewUid}/dislike")
    @ApiOperation(value = "관광지 리뷰 좋아요 취소", notes = "<strong>리뷰의 uid</strong>와 내용을 입력받아 사용자가 좋아요를 취소합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(좋아요 취소 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(이미 좋아요를 취소한 리뷰)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> dislikeTravelPlaceReview(@PathVariable Long reviewUid, HttpServletRequest request){
        Long userUid = userService.getUserUidFromAccessToken(request);
        travelPlaceReviewService.deleteLike(userUid, reviewUid);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/auth/travel-place/reviews/like")
    @ApiOperation(value = "좋아요 누른 관광지 리뷰 목록", notes = "좋아요 누른 관광지 리뷰 목록을 불러옵니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(옳바르지 않은 사용자)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyLikedTravelPlaceReview(HttpServletRequest request){
        Long userUid = userService.getUserUidFromAccessToken(request);
        User user = userRepository.findById(userUid).get();
        List<TravelPlaceReview> reviews = user.getLikes();
        return ResponseEntity.status(200)
                .body(reviews.stream().map(travelPlaceReview
                        -> ReviewSimpleRes.of(travelPlaceReview,
                        travelPlaceRepository.findById(travelPlaceReview.getTravelPlaceUid()).get(),
                        imageRepository.findImgPathByPostTypeAndPostUid(REVIEW_TYPE, travelPlaceReview.getUid()))));
    }

    @GetMapping("/auth/my-travel-place/review")
    @ApiOperation(value = "내가 작성한 관광지 리뷰 목록", notes = "내가 작성한 관광지 리뷰 목록을 불러옵니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(옳바르지 않은 사용자)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyTravelPlaceReview(HttpServletRequest request) {
        Long userUid = userService.getUserUidFromAccessToken(request);
        return ResponseEntity.status(200).body(
                travelPlaceReviewRepository.findAllByUserUid(userUid).stream().map(
                        travelPlaceReview -> ReviewSimpleRes.of(travelPlaceReview,
                                travelPlaceRepository.findById(travelPlaceReview.getTravelPlaceUid()).get(),
                                imageRepository.findImgPathByPostTypeAndPostUid(REVIEW_TYPE, travelPlaceReview.getUid()))));
    }

}
