package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.response.staff.StaffListRes;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@Api(tags = "스태프 관련 API")
@RequiredArgsConstructor
public class StaffController {
    private final UserService userService;
    private final StaffService staffService;
    private final StaffRecordRepository staffRecordRepository;


    @GetMapping("/auth/my-staff/{guestHouseUid}")
    @ApiOperation(value = "모든 스태프 조회", notes = "<strong>게스트하우스 uid</strong>를 입력받아 스태프 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(데이터가 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyStaffList(@PathVariable Long guestHouseUid, HttpServletRequest request){
        Long userUid = userService.getUserUidFromAccessToken(request);
        List<StaffRecord> staffRecords = staffRecordRepository.findAllByGuestHouseUidAndIsWorking(guestHouseUid, true);
        if(staffRecords.isEmpty()) return ResponseEntity.status(400).build();
        return ResponseEntity.status(200).body(staffRecords.stream().map(staffRecord
                -> StaffListRes.of(staffRecord)));
    }

    @DeleteMapping("/auth/my-staff/{guestHouseUid}/{staffUid}")
    @ApiOperation(value = "스태프 삭제(업무 종료)", notes = "<strong>게스트하우스 uid</strong>를 입력받아 스태프 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(데이터가 없음)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteMyStaff(@PathVariable Long guestHouseUid, @PathVariable Long staffUid){
        staffService.done(guestHouseUid, staffUid);
        return ResponseEntity.status(200).build();
    }
}
