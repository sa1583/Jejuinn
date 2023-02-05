package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.response.WorkListRes;
import com.jejuinn.backend.db.repository.WorkRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = "구인 직무 관련 기능 API")
@RequiredArgsConstructor
public class WorkController {

    private final WorkRepository workRepository;

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
}
