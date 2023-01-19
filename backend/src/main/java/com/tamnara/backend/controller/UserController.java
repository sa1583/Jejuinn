package com.tamnara.backend.controller;

import com.tamnara.backend.dto.request.UserRegisterPostReq;
import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@Api(tags = "회원 관련 기능 API")
public class UserController {

    @PostMapping("/users")
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디, 패스워드, 닉네임, 이메일, 이메일 수신동의 여부</strong>을 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 가입 성공"),
            @ApiResponse(code = 400, message = "BAD REQUEST(기타 에러) : check validity of RequestBody"),
            @ApiResponse(code = 409, message = "CONFLICT(ID, Email 등 중복 실패)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> signUp(
            @ApiParam(value = "userId, password, nickname, email, emailReceiveAllow")
            @Valid @RequestBody UserRegisterPostReq userRegisterPostReq){
        System.out.println(userRegisterPostReq);
        return null;
    }
}
