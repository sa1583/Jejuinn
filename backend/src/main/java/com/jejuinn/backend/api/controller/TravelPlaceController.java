package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.InsertTravelPlacePostReq;
import com.jejuinn.backend.api.dto.response.travelplace.ImgUrlWithReviewUid;
import com.jejuinn.backend.api.dto.response.travelplace.TravelPlaceDetailRes;
import com.jejuinn.backend.api.dto.response.travelplace.TravelPlaceListRes;
import com.jejuinn.backend.api.dto.response.travelplace.TravelPlacePinsRes;
import com.jejuinn.backend.api.dto.search.NaverLocalSearchRes;
import com.jejuinn.backend.api.service.s3.S3Uploader;
import com.jejuinn.backend.api.service.social.NaverService;
import com.jejuinn.backend.db.entity.Area;
import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.entity.TravelPlace;
import com.jejuinn.backend.db.entity.TravelPlaceReview;
import com.jejuinn.backend.db.repository.ImageRepository;
import com.jejuinn.backend.db.repository.TravelPlaceRepository;
import com.jejuinn.backend.db.repository.TravelPlaceReviewRepository;
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

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@Api(tags = "관광지 관련 기능 API")
@RequiredArgsConstructor
@Slf4j
public class TravelPlaceController {

    private final TravelPlaceRepository travelPlaceRepository;
    private final TravelPlaceReviewRepository travelPlaceReviewRepository;
    private static final String TRAVEL_PLACE = "TRAVEL_PLACE";
    private static final String REVIEW = "REVIEW";
    private final ImageRepository imageRepository;
    private final NaverService naverService;
    private final S3Uploader s3Uploader;

    @GetMapping("/api/travelPlace/pins")
    @ApiOperation(value = "모든 관광지 위치 보기(지도에 핀 찍을 때)", notes = "관광지의 위치 정보를 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getTravelPlacePins(){
        return ResponseEntity.status(200)
                .body(travelPlaceRepository.findAll()
                        .stream()
                        .map(travelPlace
                                -> TravelPlacePinsRes.of(travelPlace)));
    }

    @GetMapping("/api/travelPlace")
    @ApiOperation(value = "관광지 조회(리뷰 최신순)", notes = "<strong>페이지네이션 정보를 받아</strong> 15개씩 사진, 카테고리, 관광지명, uid를 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getTravelPlaceList(@PageableDefault(size = 15) Pageable pageable){
        return ResponseEntity.status(200)
                .body(travelPlaceRepository.findAllByOrderByDateUpdatedDesc(pageable)
                        .map(travelPlace
                                -> TravelPlaceListRes.of(travelPlace,
                                imageRepository.findImgPathByPostTypeAndPostUid(TRAVEL_PLACE, travelPlace.getUid()))));
    }

    @GetMapping("/api/travelPlace/search/name")
    @ApiOperation(value = "관광지 이름 검색", notes = "<strong>관광지 이름</strong>을 입력받아 최대 10개의 업체명을 응답합니다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getTravelPlaceNameList(@RequestParam String query){
        NaverLocalSearchRes result = naverService.getNameSearchResult(query);
        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("/api/travelPlace")
    @ApiOperation(value = "관광지 추가", notes = "<strong>관광지 정보(travel-place)와 사진(images)을 입력받아</strong>을 입력받아 저장합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삽입 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertTravelPlace(
            @RequestPart("images") List<MultipartFile> images,
            @Valid @RequestPart("travel-place") InsertTravelPlacePostReq req){

        // 명소 저장
        TravelPlace travelPlace = travelPlaceRepository.save(req.toTravelPlace());

        // 사진 저장
        try {
            s3Uploader.uploadImages(images, TRAVEL_PLACE, travelPlace.getUid());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/api/travelPlace/{travelPlaceUid}")
    @ApiOperation(value = "관광지 상세 조회", notes = "<strong>관광지의 uid</strong>를 입력받아 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(관광지 정보 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getTravelPlace(@PathVariable Long travelPlaceUid){

        Optional<TravelPlace> travelPlace = travelPlaceRepository.findById(travelPlaceUid);
        if(travelPlace.isEmpty()) return ResponseEntity.status(400).build();

        List<Image> images = imageRepository.findAllByPostTypeAndPostUid(TRAVEL_PLACE, travelPlaceUid);
        Optional<List<TravelPlaceReview>> reviews = travelPlaceReviewRepository.findAllByTravelPlaceUid(travelPlaceUid);

        List<ImgUrlWithReviewUid> reviewWithImg = null;
        if(reviews.isPresent()){
            reviewWithImg = reviews.get().stream().map(travelPlaceReview
                    -> ImgUrlWithReviewUid
                            .builder()
                            .imgPath(imageRepository.findImgPathByPostTypeAndPostUid(REVIEW, travelPlaceReview.getUid()))
                            .reviewUid(travelPlaceReview.getUid())
                            .build())
                    .collect(Collectors.toList());
        }

        return ResponseEntity.status(200)
                .body(TravelPlaceDetailRes.of(travelPlace.get(), images, reviewWithImg));
    }

}
