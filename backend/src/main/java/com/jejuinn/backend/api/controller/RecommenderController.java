package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.response.recommender.RecommendResumeDto;
import com.jejuinn.backend.api.dto.response.recommender.RecommendWorkDto;
import com.jejuinn.backend.api.service.RecommenderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Api(tags = "스태프 추천 관련 기능 API")
@RequiredArgsConstructor
@Slf4j
public class RecommenderController {
    private final RecommenderService recommenderService;

    @GetMapping("/api/job-offer/recommend")
    @ApiOperation(value = "모집중인 직무 모두 보기(시간 순서대로)", notes = "구인 공고의 모든 직무 정보들을 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(데이터가 없습니다)"),
            @ApiResponse(code = 400, message = "BAD REQEUST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getRecommendStaffList(@RequestParam("workUid") Long workUid){
        // 직무 정보를 가져옵니다.
        RecommendWorkDto recommendWorkDto = recommenderService.getWorkInfo(workUid);

        // 현재 구직 중인 staff 정보를 가져옵니다.
        List<RecommendResumeDto> recommendResumeDto = recommenderService.getResumeInfo(recommendWorkDto);
        int num = 0;
        for (RecommendResumeDto dto : recommendResumeDto) {
            log.info("RecommendResumeDto {} : {}", ++num, dto);
        }
        return null;
    }
}
