package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.response.GuestHouseWithImageRes;
import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.enums.ImageType;
import com.jejuinn.backend.db.repository.GuestHouseRepository;
import com.jejuinn.backend.db.repository.GuestHouseRepositorySupport;
import com.jejuinn.backend.db.repository.ImageRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@Api(tags = "게스트 하우스 관련 기능 API")
@RequiredArgsConstructor
public class GuestHouseController {
    private final GuestHouseRepository guestHouseRepository;
    private final GuestHouseRepositorySupport guestHouseRepositorySupport;
    private final ImageRepository imageRepository;

    /**
     *
     * @param pageable
     * @return
     */
    @GetMapping("/api/guest-house")
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
                            GuestHouseWithImageRes.of(guestHouse,
                                 imageRepository.findAllByPostTypeAndPostUid(ImageType.GUEST_HOUSE.name(), guestHouse.getUid()))));
    }

    @PostConstruct
    public void init(){
        for (int i = 0; i < 100; i++) {
            imageRepository.save(Image.builder()
                    .postType(ImageType.GUEST_HOUSE.name())
                    .postUid(i+0L)
                    .imgPath("image"+i+".png").build());
            guestHouseRepository.save(GuestHouse.builder()
                    .guestHouseName("name"+i)
                    .representativeUid(i+1L)
                    .address("서울특별시 "+i+"번로")
                    .addressDetail(i+"동").build());
        }
    }

}
