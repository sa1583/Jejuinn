package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.staff.EvaluationStaffPostReq;
import com.jejuinn.backend.api.dto.response.staff.StaffListRes;
import com.jejuinn.backend.api.service.ResumeInfoService;
import com.jejuinn.backend.api.service.StaffService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.db.entity.StaffRecord;
import com.jejuinn.backend.db.repository.StaffRecordRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@Api(tags = "스태프 관련 API")
@RequiredArgsConstructor
public class StaffController {
    private final UserService userService;
    private final StaffService staffService;
    private final StaffRecordRepository staffRecordRepository;
    private final ResumeInfoService resumeInfoService;


    @GetMapping("/auth/guest-house/staff")
    @ApiOperation(value = "내 게스트 하우스의 모든 스태프 조회", notes = "<strong>게스트하우스 uid</strong>를 입력받아 스태프 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(게스트 하우스가 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyStaffList(@RequestParam Long guestHouseUid, HttpServletRequest request){
        // 접속한 유저의 uid를 가져옵니다.
        Long userUid = userService.getUserUidFromAccessToken(request);

        // 게스트 하우스의 스태프 목록을 불러옵니다.
        List<StaffRecord> staffRecords = staffService.getMyStaffList(guestHouseUid, userUid);

        return ResponseEntity.status(200).body(staffRecords.stream().map(staffRecord
                -> StaffListRes.of(staffRecord)));
    }

    @GetMapping("/auth/guest-house/staff/active")
    @ApiOperation(value = "내 게스트 하우스의 업무 중인 스태프만 조회", notes = "<strong>게스트하우스 uid</strong>를 입력받아 스태프 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(게스트 하우스가 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyActiveStaffList(@RequestParam Long guestHouseUid, HttpServletRequest request){
        // 접속한 유저의 uid를 가져옵니다.
        Long userUid = userService.getUserUidFromAccessToken(request);

        // 게스트 하우스의 스태프 목록을 불러옵니다.
        List<StaffRecord> staffRecords = staffService.getMyActiveStaffList(guestHouseUid, userUid);

        return ResponseEntity.status(200).body(staffRecords.stream().map(staffRecord
                -> StaffListRes.of(staffRecord)));
    }

    @DeleteMapping("/auth/guest-house/staff")
    @ApiOperation(value = "내 스태프 업무 종료", notes = "<strong>게스트하우스 uid</strong>를 입력받아 스태프 업무를 종료합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(데이터가 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteMyStaff(@RequestParam Long guestHouseUid,
                                           @RequestParam Long staffUid,
                                           HttpServletRequest request){
        Long userUid = userService.getUserUidFromAccessToken(request);
        staffService.doneMyStaff(guestHouseUid, staffUid, userUid);
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/auth/guest-house/staff")
    @ApiOperation(value = "스태프 채용(자동 매칭의 경우)", notes = "<strong>게스트하우스 uid, userUid, workName</strong>를 입력받아" +
            " 스태프를 채용합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(데이터가 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> addMyStaff(@RequestParam Long guestHouseUid,
                                        @RequestParam Long userUid,
                                        @RequestParam String workName,
                                        HttpServletRequest request){
        Long representativeUid = userService.getUserUidFromAccessToken(request);
        staffService.addMyStaff(guestHouseUid, representativeUid, userUid, workName);
        resumeInfoService.update(userUid);
        return ResponseEntity.status(200).build();
    }

}
