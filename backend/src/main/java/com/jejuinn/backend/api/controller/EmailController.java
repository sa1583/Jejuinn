package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.email.OpenViduLinkReq;
import com.jejuinn.backend.api.service.EmailService;
import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.repository.GuestHouseRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.exception.NoContentException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Api(tags = "이메일 관련 기능 API")
@RequiredArgsConstructor
public class EmailController {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final GuestHouseRepository guestHouseRepository;

    @PostMapping("/api/openvidu/link")
    @ApiOperation(value = "면접 대상자에게 링크 보내기", notes = "<b>면접 대상자의 uerUid, 면접 link</b>를 입력받아 이메일을 전송합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(메일 발송 선공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> openviduInviteMsg(@RequestBody @Valid OpenViduLinkReq req){
        // user 정보를 가져옵니다.
        User user = userRepository.findById(req.getUserUid())
                .orElseThrow(()-> new UsernameNotFoundException("사용자 정보가 없습니다."));

        // user의 email이 없다면 400
        if(user.getEmail() == null) return ResponseEntity.status(400).build();

        // 게스트 하우스 정보를 가져옵니다.
        GuestHouse guestHouse = guestHouseRepository.findById(req.getGuestHouseUid())
                .orElseThrow(()->new NoContentException("게스트 하우스가 없습니다."));

        try {
            // 면접 대상자에게 메일을 보냅니다.
            emailService.sendMessage(user.getEmail(), req.getUrl(), guestHouse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).build();
    }

}
