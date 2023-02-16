package com.jejuinn.backend.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jejuinn.backend.api.dto.SMS.MessageDto;
import com.jejuinn.backend.api.dto.SMS.SMSResponseDto;
import com.jejuinn.backend.api.dto.SMS.SMSSendReq;
import com.jejuinn.backend.api.service.SMSService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.repository.GuestHouseRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@RestController
@Api(tags = "문자 관련 기능 API")
@RequiredArgsConstructor
public class SMSController {

    private final SMSService smsService;

    private final GuestHouseRepository guestHouseRepository;

    private final UserRepository userRepository;

    private final UserService userService;


    @PostMapping("/auth/interview/phone")
    @ApiOperation(value = "면접을 위한 문자메세지 보내기", notes = "구인 공고의 모든 직무 정보들을 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(보내기 성공)"),
            @ApiResponse(code = 400, message = "BAD REQEUST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> sendPhoneInterview(@RequestBody SMSSendReq smsSendReq) throws
            UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        String content = null;

        Optional<GuestHouse> guestHouse = guestHouseRepository.findById(smsSendReq.getGuestHouseUid());
        Optional<User> user = userRepository.findById(smsSendReq.getUserUid());
        if(guestHouse.isPresent()) {
            content = String.format("안녕하십니까. %s입니다. " +
                    "귀하는 저희 게스트하우스의 면접 대상자로 선정되셨습니다. " +
                    "%s 다음 번호로 연락주시면 감사하겠습니다.", guestHouse.get().getGuestHouseName(), guestHouse.get().getPhone());
        } else {
            return ResponseEntity.status(400).build();
        }
        user.get().setPhone(user.get().getPhone().replaceAll("-", ""));
        MessageDto messageDto = null;
        if(user.isPresent()) {
            messageDto = MessageDto.builder().content(content).to(user.get().getPhone()).build();
        } else {
            return ResponseEntity.status(400).build();
        }
        SMSResponseDto response = smsService.sendSms(messageDto);
        if(response == null) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).build();
    }
}
