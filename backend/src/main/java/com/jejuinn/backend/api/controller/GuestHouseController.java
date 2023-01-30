package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.response.GuestHouseWithImageRes;
import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.repository.GuestHouseRepository;
import com.jejuinn.backend.db.repository.GuestHouseRepositorySupport;
import com.jejuinn.backend.db.repository.ImageRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
     * @param pageNo
     * @return
     */
    @GetMapping("/api/guest-house")
    @ApiOperation(value = "게스트하우스 리스트 보기", notes = "<strong> pageNo를 입력받아</strong> 게스트하우스를 15개씩 보여줍니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(데이터가 없습니다)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getGuestHouseList(@RequestParam("pageNo") String pageNo){
        int limit = 15; // 한번에 페이지에 보여줄 갯수
        int start = (Integer.parseInt(pageNo) - 1) * limit;
        int count = guestHouseRepository.countBy().intValue();
        if(count != 0 || start > count) return ResponseEntity.status(204).build();

        List<GuestHouse> guestHouseList = guestHouseRepositorySupport.getGuestHouseList(start, limit);

        System.out.println(guestHouseList.size());
        List<GuestHouseWithImageRes> guestHouseWithImageResList = new ArrayList<>();
        for (GuestHouse guestHouse : guestHouseList) {
            guestHouseWithImageResList
                    .add(GuestHouseWithImageRes.of(guestHouse,
                            imageRepository.findAllByPostTypeAndPostUid("GUEST_HOUSE", guestHouse.getUid())));
        }

        return ResponseEntity.status(200).body(guestHouseWithImageResList);
    }

}
