package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.recruitment.InsertWorkResumeInfoPostReq;
import com.jejuinn.backend.api.dto.request.resumeinfo.InsertResumeInfoPostReq;
import com.jejuinn.backend.api.dto.request.resumeinfo.UpdateResumeInfoPutReq;
import com.jejuinn.backend.api.dto.response.resumeinfo.*;
import com.jejuinn.backend.api.service.RecruitmentService;
import com.jejuinn.backend.api.service.ResumeInfoService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.db.entity.ResumeInfo;
import com.jejuinn.backend.db.entity.WorkResumeInfo;
import com.jejuinn.backend.db.repository.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@Api(tags = "구직 관련 기능 API")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeInfoRepository resumeInfoRepository;
    private final ResumeInfoService resumeInfoService;
    private final WorkResumeInfoRepository workResumeInfoRepository;
    private final UserRepository userRepository;
    private final StaffRecordRepository staffRecordRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final AreaRepository areaRepository;
    private final UserService userService;

    @PostMapping("/auth/job-search")
    @ApiOperation(value = "지원서 작성", notes = "InsertResumeInfoPostReq를 입력받아 지원서를 작성합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(등록 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertResumeInfo(@Valid @RequestBody InsertResumeInfoPostReq insertResumeInfoPostReq, HttpServletRequest request) {
        Long userUid = userService.getUserUidFromAccessToken(request);
        Optional<ResumeInfo> existResumeInfo = resumeInfoRepository.findByUserUidAndIsDeletedFalse(userUid);
        if(existResumeInfo.isPresent()) {
            return ResponseEntity.status(400).build();
        }
        ResumeInfo resumeInfo = insertResumeInfoPostReq.toResumeInfo();
        if(resumeInfo.getInterestAreas().get(0).getAreaName().equals("전체")) {
            resumeInfo.getInterestAreas().remove(0);
            resumeInfo.setInterestAreas(areaRepository.findAll());
        }
        resumeInfoRepository.save(resumeInfo);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/auth/job-search/{resumeInfoUid}")
    @ApiOperation(value = "지원서 삭제", notes = "resumeInfoUid를 제공받아 그에 대한 지원서를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "userUid와 writerUid가 다른경우, 권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteResumeInfo(@PathVariable Long resumeInfoUid, HttpServletRequest request) {
        Long userUid = userService.getUserUidFromAccessToken(request);
        Long writeUid = resumeInfoRepository.findById(resumeInfoUid).get().getUser().getUid();
        if(!Objects.equals(userUid, writeUid)) return ResponseEntity.status(401).build();
        ResumeInfo resumeInfo = resumeInfoRepository.findById(resumeInfoUid).get();
        resumeInfo.setDeleted(true);
        resumeInfoRepository.save(resumeInfo);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/auth/job-search/{userUid}")
    @ApiOperation(value = "내 지원서 상세 조회", notes = "userUid를 통해 지원서를 상세 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "작성된 이력서가 없습니다."),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyResumeInfo(@PathVariable Long userUid) {
        ResumeInfoDetail resumeInfoDetail = ResumeInfoDetail.of(resumeInfoRepository.findByUserUidAndIsDeletedFalse(userUid));
        if(resumeInfoDetail == null) return ResponseEntity.status(204).build();
        ResumeInfoDetailRes resumeInfoDetailRes = ResumeInfoDetailRes.of(
                resumeInfoDetail,
                UserDetail.of(userRepository.findById(userUid)),
                StaffRecordDetail.of(staffRecordRepository.findAllByUserUidAndIsActiveTrueOrderByStartDateDesc(userUid)));
        return ResponseEntity.status(200).body(
                resumeInfoDetailRes
        );
    }

    @PutMapping("/auth/auto-apply/{userUid}")
    @ApiOperation(value = "자동추천 ON/OFF", notes = "userUid를 통해 마이 페이지에서 내 지원서의 자동추천 여부를 변경합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateAutoApply(@PathVariable Long userUid, HttpServletRequest request) {
        ResumeInfo resumeInfo = resumeInfoService.update(userUid);
        if(resumeInfo == null) return ResponseEntity.status(400).build();
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/job-search")
    @ApiOperation(value = "내 지원서 수정", notes = "UpdateResumeInfoPutReq를 통해 내가 작성해놓은 지원서를 수정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateResumeInfo(@Valid @RequestBody UpdateResumeInfoPutReq updateResumeInfoPutReq) {
        ResumeInfo resumeInfo = updateResumeInfoPutReq.toResumeInfo();
        if(resumeInfo.getInterestAreas().get(0).getAreaName().equals("전체")) {
            resumeInfo.getInterestAreas().remove(0);
            resumeInfo.setInterestAreas(areaRepository.findAll());
        }
        resumeInfoRepository.save(resumeInfo);
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/auth/job-search/apply")
    @ApiOperation(value = "지원서 제출", notes = "userUid와 workUid를 통해 지원서를 제출합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(제출 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(지원서가 없음)"),
            @ApiResponse(code = 409, message = "이미 지원한 공고"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> applyWork(@Valid @RequestBody InsertWorkResumeInfoPostReq insertWorkResumeInfoPostReq) {
        WorkResumeInfo workResumeInfo = resumeInfoService.insertWorkResumeInfo(insertWorkResumeInfoPostReq);
        if(workResumeInfo != null) {
            if(workResumeInfoRepository.findByResumeInfoUidAndWorkUid(workResumeInfo.getResumeInfo().getUid(),
                    workResumeInfo.getWork().getUid()) != null) return ResponseEntity.status(409).build();
            workResumeInfoRepository.save(workResumeInfo);
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.status(400).build();
        }
    }

    @GetMapping("/auth/my-apply-list")
    @ApiOperation(value = "내 지원목록 확인", notes = "userUid를 통해 내 지원목록을 확인합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "데이터가 없습니다"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyApplicant(HttpServletRequest request) {
        Long userUid = userService.getUserUidFromAccessToken(request);
        return ResponseEntity.status(200).body(
                recruitmentRepository.findMyApplyListByUserUid(userUid)
        );
    }

}
