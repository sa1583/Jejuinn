package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.response.recommender.RecommendResumeDto;
import com.jejuinn.backend.api.dto.response.recommender.RecommendWorkDto;
import com.jejuinn.backend.api.dto.response.recruitment.MyApplicantDetailRes;
import com.jejuinn.backend.api.service.RecommenderService;
import com.jejuinn.backend.api.service.ResumeInfoService;
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
import java.util.stream.Collectors;

@RestController
@Api(tags = "스태프 추천 관련 기능 API")
@RequiredArgsConstructor
@Slf4j
public class RecommenderController {
    private final ResumeInfoService resumeInfoService;
    private final RecommenderService recommenderService;

    @GetMapping("/api/job-offer/recommend")
    @ApiOperation(value = "스탭 추천", notes = "직무 uid를 입력받아 추천하는 스탭 리스트를 리턴합니다.")
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

        for (RecommendResumeDto dto : recommendResumeDto) {
            log.info("RecommendResumeDto : Resume Uid {} ", dto.getResumeInfoUid());
        }

        // 이력서를 평가합니다.
        List<RecommendResumeDto> resumes = recommenderService.getScoreFromFlask(recommendWorkDto, recommendResumeDto);

        List<MyApplicantDetailRes> result = resumes.stream().map(resumeDto -> {
            Long resumeInfoUid = resumeDto.getResumeInfoUid();
            return resumeInfoService.getMyApplicant(resumeInfoUid);
        }).collect(Collectors.toList());

        if(result.size() > 3){
            return ResponseEntity.status(200).body(result.subList(0,3));
        }
        return ResponseEntity.status(200).body(result);
    }
}
