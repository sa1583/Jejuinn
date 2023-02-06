package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.recruitment.InsertRecruitmentPostReq;
import com.jejuinn.backend.api.dto.response.recruitment.RecruitmentDetailRes;
import com.jejuinn.backend.api.dto.response.recruitment.WorkDetailRes;
import com.jejuinn.backend.api.dto.response.recruitment.WorkListRes;
import com.jejuinn.backend.db.repository.ImageRepository;
import com.jejuinn.backend.db.repository.RecruitmentRepository;
import com.jejuinn.backend.db.repository.WorkRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Api(tags = "구인 관련 기능 API")
@RequiredArgsConstructor
public class RecruitmentController {

    private final WorkRepository workRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final ImageRepository imageRepository;
    private static final String RECRUITMENT_TYPE = "RECRUITMENT";

    @GetMapping("/api/job-offer")
    @ApiOperation(value = "일하기 페이지에서 현재 모집중인 직무 모두 보기(시간 순서대로)", notes = "구인 공고의 직무 정보들을 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(데이터가 없습니다)"),
            @ApiResponse(code = 400, message = "BAD REQEUST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getWorkList(@PageableDefault(size = 15) Pageable pageable) {
        return ResponseEntity.status(200)
                .body(workRepository.findAll(pageable)
                        .map(work -> WorkListRes.of(work)));
    }

    @GetMapping("/api/job-offer/{recruitmentUid}")
    @ApiOperation(value = "일하기 페이지에서 현재 모집중인 직무 중 하나 클릭시 그에 대한 구인공고로 이동", notes = "특정 구인 공고에 대한 정보를 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQEUST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getRecruitmentDetail(@PathVariable String recruitmentUid) {
        return ResponseEntity.status(200)
                .body(recruitmentRepository.findById(Long.parseLong(recruitmentUid))
                        .map(recruitment ->
                                RecruitmentDetailRes.of(recruitment,
                                        WorkDetailRes.ofDetail(workRepository.findAllByRecruitmentUid(Long.parseLong(recruitmentUid))),
                                        imageRepository.findAllByPostTypeAndPostUid(RECRUITMENT_TYPE, Long.parseLong(recruitmentUid))
                                )));
    }

    @PostMapping("/auth/job-offer")
    @ApiOperation(value = "모집공고 작성", notes = "모집공고 등록시 그에 대한 모집공고, 직무, 이미지가 저장됩니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(등록 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertRecruitment(@RequestPart List<MultipartFile> images,
                                               @RequestPart InsertRecruitmentPostReq insertRecruitmentPostReq) {
        return null;
    }
}
