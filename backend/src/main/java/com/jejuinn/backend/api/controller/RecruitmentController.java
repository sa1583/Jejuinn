package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.recruitment.*;
import com.jejuinn.backend.api.dto.response.recruitment.*;
import com.jejuinn.backend.api.dto.response.resumeinfo.ResumeInfoDetail;
import com.jejuinn.backend.api.dto.response.resumeinfo.ResumeInfoDetailRes;
import com.jejuinn.backend.api.dto.response.resumeinfo.StaffRecordDetail;
import com.jejuinn.backend.api.dto.response.resumeinfo.UserDetail;
import com.jejuinn.backend.api.service.RecruitmentService;
import com.jejuinn.backend.api.service.ResumeInfoService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.api.service.s3.S3Uploader;
import com.jejuinn.backend.db.entity.Recruitment;
import com.jejuinn.backend.db.entity.Work;
import com.jejuinn.backend.db.entity.WorkResumeInfo;
import com.jejuinn.backend.db.repository.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@Api(tags = "구인 관련 기능 API")
@RequiredArgsConstructor
public class RecruitmentController {

    private final WorkRepository workRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final GuestHouseRepositorySupport guestHouseRepositorySupport;
    private final ImageRepository imageRepository;
    private final ResumeInfoService resumeInfoService;
    private final S3Uploader s3Uploader;
    private static final String RECRUITMENT_TYPE = "RECRUITMENT";
    private final WorkResumeInfoRepository workResumeInfoRepository;
    private final ResumeInfoRepository resumeInfoRepository;
    private final UserRepository userRepository;
    private final StaffRecordRepository staffRecordRepository;
    private final RecruitmentService recruitmentService;
    private final UserService userService;
    private final Logger logger = LoggerFactory.getLogger(RecruitmentController.class);

    @GetMapping("/api/job-offer")
    @ApiOperation(value = "모집중인 직무 모두 보기(시간 순서대로)", notes = "구인 공고의 모든 직무 정보들을 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(데이터가 없습니다)"),
            @ApiResponse(code = 400, message = "BAD REQEUST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getWorkList(@RequestParam("pageNumber") int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber-1, 15);
        return ResponseEntity.status(200)
                .body(workRepository.findAll(pageable)
                        .map(work -> WorkRes.of(work,
                                workRepository.findUserUidByWorkUid(work.getUid())
                                )));
    }

    @GetMapping("/api/job-offer/{recruitmentUid}")
    @ApiOperation(value = "recruitmentUid를 통해 모집공고 세부 정보 제공", notes = "특정 구인 공고에 대한 정보를 리턴합니다." +
            "직무, 이미지, 채용공고 관련 정보 제공")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQEUST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getRecruitmentDetail(@PathVariable Long recruitmentUid) {
        return ResponseEntity.status(200)
                .body(recruitmentRepository.findById(recruitmentUid)
                        .map(recruitment ->
                                RecruitmentDetailRes.of(recruitment,
                                        WorkRes.ofs(workRepository.findAllByRecruitmentUid(recruitmentUid),
                                                recruitmentRepository.findUserUidByRecruitmentUid(recruitment.getUid())),
                                        imageRepository.findAllByPostTypeAndPostUid(RECRUITMENT_TYPE, recruitmentUid),
                                        recruitmentRepository.findUserUidByRecruitmentUid(recruitment.getUid())
                                )));
    }

    @PostMapping("/auth/job-offer")
    @ApiOperation(value = "모집공고 작성", notes = "모집공고(InsertRecruitmentPostReq) + 인재상(String 배열), " +
            "직무(InsertWorkPostReq) : 직무, 이미지(images)를 보내주면 이를 저장합니다.\n" +
            "ReqeustModel에 대한 자세한 설명은 밑에 Model 참고")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(등록 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertRecruitment(@Valid @RequestPart(value="recruitmentBody") RecruitmentBodyDto recruitmentBodyDto,
                                               @RequestPart(value = "uploadImages") List<MultipartFile> uploadImages) {
        logger.info("들어온 wanted의 크기는 {}", recruitmentBodyDto.getRecruitment().getWanted().size());
        if(recruitmentBodyDto.getRecruitment().getWanted().size() != 0) {
            logger.info("첫번째 {}", recruitmentBodyDto.getRecruitment().getWanted().get(0));
        }
        Recruitment recruitment = recruitmentRepository.save(recruitmentBodyDto.getRecruitment().toRecruitment());
        List<InsertWorkPostReq> works = recruitmentBodyDto.getWorks();
        for(int i = 0 ; i < works.size() ; i++) {
            workRepository.save(works.get(i).toWork(recruitment));
        }

        try {
            s3Uploader.uploadImages(uploadImages, RECRUITMENT_TYPE, recruitment.getUid());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/job-offer/{recruitmentUid}")
    @ApiOperation(value = "모집공고 수정", notes = "모집공고(Recruitment), 직무(Work), 이미지(images)를 수정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateRecruitment(@RequestPart(value = "uploadImages", required = false) List<MultipartFile> images,
                                               @RequestPart(value = "deleteImages", required = false) List<Long> list,
                                               @RequestPart(value = "recruitmentBody") RecruitmentBodyDto recruitmentBodyDto,
                                               @PathVariable Long recruitmentUid) {
        Recruitment recruitment = recruitmentBodyDto.getRecruitment().toRecruitment();
        recruitment.setUid(recruitmentUid);
        recruitmentRepository.save(recruitment);

        // 사진 삭제
        try {
            if(list != null && !list.isEmpty()) s3Uploader.deleteImages(list);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }

        // 사진 저장
        try {
            if(images != null && !images.isEmpty()) s3Uploader.uploadImages(images, RECRUITMENT_TYPE, recruitment.getUid());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }

        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/auth/job-offer/{recruitmentUid}")
    @ApiOperation(value = "모집공고 삭제", notes = "모집공고(Recruitment), 직무(Work), 이미지(images)를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteRecruitment(@PathVariable Long recruitmentUid, HttpServletRequest request) {
        Long userUid = userService.getUserUidFromAccessToken(request);
        recruitmentService.deleteRecruitment(recruitmentUid, userUid);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/auth/recruitment-work-list/{guestHouseUid}")
    @ApiOperation(value = "특정 게스트하우스에 대한 직무 리스트 확인", notes = "gusetHouseUid를 통해 특정 게스트하우스가 모집중인 직무 목록을 보여줍니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "데이터가 없습니다."),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyWorkList(@PathVariable Long guestHouseUid) {
        List<Work> works = recruitmentRepository.findWorkByGuestHouseUid(guestHouseUid);
        if(works == null || works.size() == 0) return ResponseEntity.status(204).build();
        System.out.println(works.size());
        Long uid = workRepository.findUserUidByWorkUid(works.get(0).getUid());
        System.out.println(uid);
        return ResponseEntity.status(200).body(
                works.stream().map(
                        work -> WorkRes.of(work,
                                workRepository.findUserUidByWorkUid(work.getUid())
                )
        ));
    }

    @GetMapping("/api/guest-house-recruitment/{guestHouseUid}")
    @ApiOperation(value = "특정 게스트하우스에 대한 모집공고 리스트 확인", notes = "gusetHouseUid를 통해 특정 게스트하우스에 대한 모든 모집공고 목록을 보여줍니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "데이터가 없습니다."),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyRecruitment(@PathVariable Long guestHouseUid) {
        return ResponseEntity.status(200)
                .body(recruitmentRepository.findAllByGuestHouseUidOrderByDateCreatedDesc(guestHouseUid)
                        .stream().map(recruitment -> MyRecruitmentListRes.of(recruitment))
                        .collect(Collectors.toList()));
    }

    @GetMapping("/auth/recruitment/{workUid}")
    @ApiOperation(value = "직무에 대한 지원자 목록 확인", notes = "workUid를 이용하여 그 직무에 지원한 지원자 정보를 불러옵니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "데이터가 없습니다."),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getApplicant(@PathVariable Long workUid) {
        List<Long> resumeInfoUids = workResumeInfoRepository.findResumeInfoUidByWorkUid(workUid);
        List<MyApplicantDetailRes> result = resumeInfoService.getMyApplicant(resumeInfoUids);
        if(result.size() == 0) return ResponseEntity.status(204).build();
        return ResponseEntity.status(200).body(
                result
        );
    }

    @GetMapping("/auth/job-search/{userUid}/{workUid}")
    @ApiOperation(value = "지원자의 지원서 상세 조회", notes = "userUi를 통해 지원서를 상세 조회한 뒤, workUid를 이용하여 열람 여부를 변경합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "작성된 이력서가 없습니다."),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyResumeInfo(@PathVariable Long userUid, @PathVariable Long workUid) {
        ResumeInfoDetail resumeInfoDetail = ResumeInfoDetail.of(resumeInfoRepository.findByUserUidAndIsDeletedFalse(userUid));
        if(resumeInfoDetail == null) return ResponseEntity.status(204).build();
        WorkResumeInfo workResumeInfo = workResumeInfoRepository.findByResumeInfoUidAndWorkUid(resumeInfoDetail.getUid(), workUid);
        if(workResumeInfo != null) {
            workResumeInfo.setIsRead(LocalDateTime.now());
            workResumeInfoRepository.save(workResumeInfo);
        }
        ResumeInfoDetailRes resumeInfoDetailRes = ResumeInfoDetailRes.of(
                resumeInfoDetail,
                UserDetail.of(userRepository.findById(userUid)),
                StaffRecordDetail.of(staffRecordRepository.findAllByUserUidAndIsActiveTrueOrderByStartDateDesc(userUid)));
        return ResponseEntity.status(200).body(
                resumeInfoDetailRes
        );
    }

    @DeleteMapping("/auth/work/{workUid}")
    @ApiOperation(value = "직무 삭제", notes = "workUid를 이용하여 채용공고에 대한 직무를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteWork(@PathVariable Long workUid, HttpServletRequest request) {
        Long userUid = userService.getUserUidFromAccessToken(request);
        Long writerUid = workRepository.findUserUidByWorkUid(workUid);
        if(userUid != writerUid) {
            return ResponseEntity.status(401).build();
        }
        workRepository.deleteById(workUid);
        return ResponseEntity.status(200).build();
    }
    
    @PostMapping("/auth/work")
    @ApiOperation(value = "직무 작성", notes = "WorkPostReq를 이용하여 채용공고에 대한 직무를 작성합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(작성 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertWork(@RequestBody WorkPostReq workPostReq) {
        workRepository.save(workPostReq.toWork());
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/work")
    @ApiOperation(value = "직무 수정", notes = "ModifyWorkPutReq를 이용하여 채용공고에 대한 직무를 작성합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(작성 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> modifyWork(@RequestBody ModifyWorkPutReq modifyWorkPutReq, HttpServletRequest request) {
        Long userUid = userService.getUserUidFromAccessToken(request);
        Long writerUid = workRepository.findUserUidByWorkUid(modifyWorkPutReq.getWorkUid());
        if(userUid != writerUid) {
            return ResponseEntity.status(401).build();
        }
        workRepository.save(modifyWorkPutReq.toWork());
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/api/job-offer/search")
    @ApiOperation(value = "직무 필터 조회", notes = "스타일(styles), 지역명(areaName), 게스트하우스명(word), 입도날짜(entryDate)를 받아" +
            " 그에 맞는 직무를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(검색 조건에 맞는 직무가 없습니다.)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getWorkByFilter(@RequestParam("pageNumber") int pageNumber,
                                             @RequestParam(value = "styles") List<String> styles,
                                             @RequestParam(value = "areaName") String areaName,
                                             @RequestParam(value = "word") String word,
                                             @RequestParam(value = "entryDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate entryDate) {
        Pageable pageable = PageRequest.of(pageNumber-1, 15);
        List<Long> guestHouseUidList = guestHouseRepositorySupport.searchGuestHouseUidWithFilter(styles, areaName, word);
        if(guestHouseUidList.size() == 0 || guestHouseUidList == null) return ResponseEntity.status(400).build();
        return ResponseEntity.status(200).body(
                workRepository.findByGuestHouseUidAndEntryDate(guestHouseUidList, entryDate, pageable).map(
                        work -> WorkRes.of(work,
                                workRepository.findUserUidByWorkUid(work.getUid()))
                )
        );
    }
}
