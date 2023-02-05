package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.InsertReviewPostReq;
import com.jejuinn.backend.api.dto.request.InsertTravelPlacePostReq;
import com.jejuinn.backend.api.dto.request.UpdateReviewPutReq;
import com.jejuinn.backend.api.dto.response.travelplace.*;
import com.jejuinn.backend.api.dto.search.NaverLocalSearchRes;
import com.jejuinn.backend.api.service.TravelPlaceReviewService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.api.service.s3.S3Uploader;
import com.jejuinn.backend.api.service.social.NaverService;
import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.entity.TravelPlace;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.repository.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@Api(tags = "관광지 관련 기능 API")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final TravelPlaceReviewService travelPlaceReviewService;
    private final TravelPlaceRepository travelPlaceRepository;
    private final TravelPlaceRepositorySupport travelPlaceRepositorySupport;
    private final TravelPlaceReviewRepository travelPlaceReviewRepository;
    private static final String TRAVEL_PLACE = "TRAVEL_PLACE";
    private static final String REVIEW_TYPE = "REVIEW";
    private final ImageRepository imageRepository;
    private final NaverService naverService;
    private final S3Uploader s3Uploader;


    @PostMapping("/auth/travelPlace/reviews")
    @ApiOperation(value = "관광지 리뷰 추가", notes = "<strong>리뷰의 uid</strong>를 입력받아 리뷰를 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(관광지 정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertReview(@RequestPart("images") List<MultipartFile> images,
                                          @Valid @RequestPart("review") InsertReviewPostReq req,
                                          HttpServletRequest request){
        log.info("관광지 리뷰 추가 요청");
        Long userUid = userService.getUserUidFromAccessToken(request);

        // 리뷰 저장
        TravelPlaceReview review = travelPlaceReviewRepository.save(req.toTravelPlaceReview(userUid));

        // 사진 저장
        try {
            s3Uploader.uploadImages(images, REVIEW_TYPE, review.getUid());
        } catch (IOException e) {
            log.error("AWS S3 이미지 저장 에러");
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }

        return ResponseEntity.status(200).build();
    }

    @GetMapping("/api/travelPlace/reviews/{reviewUid}")
    @ApiOperation(value = "관광지 리뷰 상세 보기", notes = "<strong>리뷰의 uid</strong>를 입력받아 리뷰를 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(관광지 정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getTravelPlaceReview(@PathVariable Long reviewUid){
        log.info("관광지 정보 상세 조회 review uid : {}", reviewUid);
        return ResponseEntity.status(200)
                .body(travelPlaceReviewRepository.findById(reviewUid)
                        .map(review -> ReviewDetailRes.of(review,
                                userRepository.findNicknameById(review.getUserUid()),
                                imageRepository.findAllByPostTypeAndPostUid(REVIEW_TYPE, review.getUid()))));
    }

    @DeleteMapping("/auth/travelPlace/reviews/{reviewUid}")
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

        travelPlaceReviewRepository.deleteById(reviewUid);
        // 차후 이미지 삭제 추가

        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/travelPlace/reviews/{reviewUid}")
    @ApiOperation(value = "관광지 리뷰 수정", notes = "<strong>리뷰의 uid</strong>와 내용을 입력받아 리뷰를 수정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(관광지 정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateTravelPlaceReview(@RequestPart("upload-images") List<MultipartFile> images,
                                                      @RequestPart("review-content") UpdateReviewPutReq req,
                                                      @RequestPart("delete-images") List<Long> list,
                                                      @PathVariable Long reviewUid){
        log.info("관광지 리뷰 수정 요청");

        // 게스트 하우스 저장
        TravelPlaceReview review = travelPlaceReviewRepository.save(req.toTravelPlaceReview(reviewUid));

        // 사진 삭제
        try {
            s3Uploader.deleteImages(list);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }

        // 사진 저장
        try {
            s3Uploader.uploadImages(images, REVIEW_TYPE, review.getUid());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }

        return ResponseEntity.status(200).build();
    }



    @PutMapping("/auth/travelPlace/reviews/{reviewUid}/like")
    @ApiOperation(value = "관광지 리뷰 좋아요", notes = "<strong>리뷰의 uid</strong>와 내용을 입력받아 좋아요 갯수를 증가합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(관광지 정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateTravelPlaceReview(@PathVariable Long reviewUid, HttpServletRequest request){
        Long userUid = userService.getUserUidFromAccessToken(request);
        Optional<User> user = userRepository.findById(userUid);


//        for (TravelPlaceReview like : user.get().getLikes()) {
//            if(like.getUid() == reviewUid) {
//                log.info("이미 좋아요를 누른 리뷰입니다.");
//                return ResponseEntity.status(400).build();
//            }
//        }
//
//        travelPlaceReviewService.addLike(reviewUid);
//        user.get().getLikes().add(TravelPlaceReview.builder()
//                .uid(reviewUid).build());

        return ResponseEntity.status(200).build();
    }

}
