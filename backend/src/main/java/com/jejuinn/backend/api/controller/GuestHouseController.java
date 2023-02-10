package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.GuestHouseDto;
import com.jejuinn.backend.api.dto.request.InsertGuestHousePostReq;
import com.jejuinn.backend.api.dto.response.guesthouse.GetGuestHouseDetailPostRes;
import com.jejuinn.backend.api.dto.response.guesthouse.GetGuestHouseListPostRes;
import com.jejuinn.backend.api.dto.response.recruitment.WorkDetailRes;
import com.jejuinn.backend.api.service.s3.S3Uploader;
import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.repository.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@Api(tags = "게스트 하우스 관련 기능 API")
@RequiredArgsConstructor
public class GuestHouseController {
    private final GuestHouseRepository guestHouseRepository;
    private final GuestHouseRepositorySupport guestHouseRepositorySupport;
    private final ImageRepository imageRepository;
    private final CommentRepository commentRepository;
    private final S3Uploader s3Uploader;
    private final RecruitmentRepository recruitmentRepository;
    private static final String GUEST_TYPE = "GUEST_HOUSE";

    /**
     *
     * @param pageable
     * @return
     */
    @GetMapping("/api/guest-houses")
    @ApiOperation(value = "게스트하우스 리스트 보기", notes = "<strong> page를 입력받아</strong> 게스트하우스를 15개씩 보여줍니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(데이터가 없습니다)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getGuestHouseList(@PageableDefault(size = 15) Pageable pageable){
        return ResponseEntity.status(200)
                .body(guestHouseRepository.findAll(pageable)
                        .map(guestHouse ->
                            GetGuestHouseListPostRes.of(guestHouse,
                                 imageRepository.findAllByPostTypeAndPostUid(GUEST_TYPE, guestHouse.getUid()))));
    }

    @GetMapping("/api/guest-houses/{guestHouseUid}")
    @ApiOperation(value = "게스트하우스 상세 보기", notes = "<strong>게스트하우스 uid</strong>를 입력받아 게스트하우스 상세 정보를 응답합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(데이터가 없습니다)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getGuestHouseDetail(@PathVariable Long guestHouseUid){
        return ResponseEntity.status(200)
                .body(guestHouseRepository.findById(guestHouseUid)
                        .map(guestHouse ->
                                GetGuestHouseDetailPostRes.of(guestHouse,
                                        imageRepository.findAllByPostTypeAndPostUid(GUEST_TYPE, guestHouse.getUid())
                                )));
    }

    @PostMapping("/auth/guest-house")
    @ApiOperation(value = "게스트하우스 등록", notes = "<strong>이미지 파일과 게스트 하우스 정보</strong>를 입력받아 저장합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(작성 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertGuestHouse(@RequestPart("images") List<MultipartFile> images,
                                              @RequestPart("guest-house") InsertGuestHousePostReq req){

        // 게스트 하우스 저장
        GuestHouse guestHouse = guestHouseRepository.save(req.toGuestHouse());

        // 사진 저장
        try {
            s3Uploader.uploadImages(images, GUEST_TYPE, guestHouse.getUid());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).build();
    }

    /**
     *
     * @param images
     * @param req
     * @param list
     * @param guestHouseUid
     * @return
     */

    @PutMapping("/auth/guest-houses/{guestHouseUid}")
    @ApiOperation(value = "게스트하우스 수정", notes = "<strong>이미지 파일과 게스트 하우스 정보, 게스트하우스 uid</strong>를 입력받아 저장합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateGuestHouse(@RequestPart(value = "upload-images", required = false) List<MultipartFile> images,
                                              @RequestPart("guest-house") InsertGuestHousePostReq req,
                                              @RequestPart(value = "delete-images", required = false) List<Long> list,
                                              @PathVariable String guestHouseUid){

        // 게스트 하우스 저장
        GuestHouse guestHouse = guestHouseRepository.save(req.toGuestHouse(guestHouseUid));

        // 사진 삭제
        try {
            s3Uploader.deleteImages(list);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }

        // 사진 저장
        try {
            s3Uploader.uploadImages(images, GUEST_TYPE, guestHouse.getUid());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }

        return ResponseEntity.status(200).build();
    }

    /**
     *
     * @param guestHouseUid
     * @return
     */
    @DeleteMapping("/auth/guest-houses/{guestHouseUid}")
    @ApiOperation(value = "게스트하우스 삭제", notes = "<strong>게스트하우스 uid</strong>를 입력받아 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(수정 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteGuestHouse(@PathVariable Long guestHouseUid){
        guestHouseRepository.deleteById(guestHouseUid);
        return ResponseEntity.status(200).build();
    }
//    @PostConstruct
//    public void init(){
//        for (int i = 0; i < 100; i++) {
//            imageRepository.save(Image.builder()
//                    .postType(ImageType.GUEST_HOUSE.name())
//                    .postUid(i+0L)
//                    .imgPath("image"+i+".png").build());
//            guestHouseRepository.save(GuestHouse.builder()
//                    .guestHouseName("name"+i)
//                    .representativeUid(i+1L)
//                    .address("서울특별시 "+i+"번로")
//                    .addressDetail(i+"동").build());
//        }
//    }

    @GetMapping("/auth/my-guest-houses/{userUid}")
    @ApiOperation(value = "내 게스트하우스 리스트 보기", notes = "userUid를 입력받아 내 게스트하우스 리스트를 보여줍니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyGuestHouseList(@PathVariable Long userUid) {
        return ResponseEntity.status(200).body(
                guestHouseRepository.findAllByRepresentativeUid(userUid).stream().map(
                        guestHouse -> GuestHouseDto.of(guestHouse)
                )
        );
    }

    @GetMapping("/api/on-recruitment/{guestHouseUid}")
    @ApiOperation(value = "게스트하우스에 대한 모집 직무 리스트", notes = "guestHouseUid를 받아 그에 대한 모집 직무 리스트 제공")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyGuestHouseWorkList(@PathVariable Long guestHouseUid) {
        return ResponseEntity.status(200).body(
                WorkDetailRes.ofDetail(recruitmentRepository.findWorkByGuestHouseUid(guestHouseUid))
        );
    }

}
