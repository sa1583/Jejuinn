package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.response.guesthouse.GetGuestHouseListPostRes;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.db.entity.Favorite;
import com.jejuinn.backend.db.repository.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Api(tags = "좋아요 관련 기능 API")
@RequiredArgsConstructor
public class FavoriteController {

    private final UserService userService;
    private final FavoriteRepository favoriteRepository;
    private final GuestHouseRepository guestHouseRepository;
    private final ImageRepository imageRepository;
    private static final String GUEST_TYPE = "GUEST_HOUSE";

    @PutMapping("/auth/guest-house/like/{guestHouseUid}")
    @ApiOperation(value = "게스트하우스 좋아요 등록", notes = "게스트하우스의 uid를 통해 사용자가 좋아요를 등록합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(좋아요 성공)"),
            @ApiResponse(code = 202, message = "이미 좋아요를 누른 게스트하우스"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> likeGuestHouse(@PathVariable Long guestHouseUid, HttpServletRequest request) {
        Long userUid = userService.getUserUidFromAccessToken(request);
        if(favoriteRepository.findByUserUidAndTypeUidAndTypeName(userUid, guestHouseUid, GUEST_TYPE) != null) {
            return ResponseEntity.status(202).build();
        }
        favoriteRepository.save(Favorite.builder().userUid(userUid).typeUid(guestHouseUid).typeName(GUEST_TYPE).build());
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/guest-house/dislike/{guestHouseUid}")
    @ApiOperation(value = "게스트하우스 좋아요 취소", notes = "게스트하우스의 uid를 통해 사용자가 좋아요를 취소합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(좋아요 성공)"),
            @ApiResponse(code = 202, message = "이미 좋아요 취소를 한 게스트하우스"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> dislikeGuestHouse(@PathVariable Long guestHouseUid, HttpServletRequest request) {
        Long userUid = userService.getUserUidFromAccessToken(request);
        Favorite favorite = favoriteRepository.findByUserUidAndTypeUidAndTypeName(userUid, guestHouseUid, GUEST_TYPE);
        if(favorite != null) {
            favoriteRepository.delete(favorite);
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.status(202).build();
        }
    }

    @GetMapping("/auth/guest-house-list/like")
    @ApiOperation(value = "좋아요한 게스트하우스 리스트", notes = "사용자가 좋아요를 누른 게스트하우스 리스트를 제공합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(좋아요 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyLikeGuestHouse(HttpServletRequest request) {
        Long userUid = userService.getUserUidFromAccessToken(request);
        List<Long> guestHouseUids = favoriteRepository.findByUserUidAndTypeName(userUid, GUEST_TYPE);
        return ResponseEntity.status(200).body(
            guestHouseRepository.findAllByGuestHouseUid(guestHouseUids).stream().map(
                    guestHouse -> GetGuestHouseListPostRes.of(
                            guestHouse,
                            imageRepository.findAllByPostTypeAndPostUid(GUEST_TYPE, guestHouse.getUid())
                    )
            )
        );
    }
}
