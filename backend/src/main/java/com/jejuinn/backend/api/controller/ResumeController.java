package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.recruitment.InsertWorkResumeInfoPostReq;
import com.jejuinn.backend.api.dto.request.resumeinfo.InsertResumeInfoPostReq;
import com.jejuinn.backend.api.dto.request.resumeinfo.UpdateResumeInfoPutReq;
import com.jejuinn.backend.api.dto.response.recruitment.MyRecruitmentListRes;
import com.jejuinn.backend.api.dto.response.resumeinfo.ResumeInfoDetailRes;
import com.jejuinn.backend.api.service.ResumeInfoService;
import com.jejuinn.backend.db.entity.WorkResumeInfo;
import com.jejuinn.backend.db.repository.ResumeInfoRepository;
import com.jejuinn.backend.db.repository.WorkResumeInfoRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.stream.Collectors;

@RestController
@Api(tags = "구직 관련 기능 API")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeInfoRepository resumeInfoRepository;
    private final ResumeInfoService resumeInfoService;
    private final WorkResumeInfoRepository workResumeInfoRepository;

    @PostMapping("/auth/job-search")
    @ApiOperation(value = "지원서 작성", notes = "")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(등록 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertResumeInfo(@Valid @RequestPart InsertResumeInfoPostReq insertResumeInfoPostReq) {
        resumeInfoRepository.save(insertResumeInfoPostReq.toResumeInfo());
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/auth/job-search/{resumeInfoUid}")
    @ApiOperation(value = "지원서 삭제", notes = "지원서")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteResumeInfo(@PathVariable Long resumeInfoUid) {
        resumeInfoRepository.deleteById(resumeInfoUid);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/auth/job-search/{userUid}")
    @ApiOperation(value = "지원서 상세 조회", notes = "userUid를 통해 지원서를 상세 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyResumeInfo(@PathVariable Long userUid) {
        return ResponseEntity.status(200)
                .body(resumeInfoRepository.findByUserUidAndIsDeletedFalse(userUid)
                        .map(resumeInfo -> ResumeInfoDetailRes.of(resumeInfo)));
    }

    @PutMapping("/auth/auto-apply/{userUid}")
    @ApiOperation(value = "자동추천 ON/OFF 기능", notes = "userUid를 통해 마이 페이지에서 내 지원서의 자동추천 여부를 변경합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateAutoApply(@PathVariable Long userUid) {
        resumeInfoService.update(userUid);
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/job-search")
    @ApiOperation(value = "내 지원서 수정", notes = "내가 작성해놓은 지원서를 수정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateResumeInfo(@Valid @RequestPart UpdateResumeInfoPutReq updateResumeInfoPutReq) {
        resumeInfoRepository.save(updateResumeInfoPutReq.toResumeInfo());
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/auth/job-search/apply")
    @ApiOperation(value = "지원서 제출 기능", notes = "userUid와 workUid를 통해 지원서를 제출합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(제출 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> applyWork(@Valid @RequestPart InsertWorkResumeInfoPostReq insertWorkResumeInfoPostReq) {
        WorkResumeInfo workResumeInfo = resumeInfoService.insertWorkResumeInfo(insertWorkResumeInfoPostReq);
        if(workResumeInfo != null) {
            workResumeInfoRepository.save(workResumeInfo);
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.status(400).build();
        }
    }
}
