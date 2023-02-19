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
import com.jejuinn.backend.db.entity.ResumeInfo;
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
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
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
                                        // 공고 + 직무들을 가져옵니다.
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
        // 공고를 저장합니다.
        Recruitment recruitment = recruitmentRepository.save(recruitmentBodyDto.getRecruitment().toRecruitment());

        // 공고의 직무들을 저장합니다.
        List<InsertWorkPostReq> works = recruitmentBodyDto.getWorks();
        for(int i = 0 ; i < works.size() ; i++) {
            workRepository.save(works.get(i).toWork(recruitment));
        }

        // 이미지 저장
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
        // 게스트 하우스의 직무 리스트를 가져옵니다.
        List<Work> works = recruitmentRepository.findWorkByGuestHouseUid(guestHouseUid);

        // 직무가 없다면 204 No Cotent
        if(works == null || works.size() == 0) return ResponseEntity.status(204).build();


        return ResponseEntity.status(200).body(
                works.stream().map(
                        // 직무 + 게스트하우스 사장 uid를 리턴
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
        // 직무의 이력서 uid 리스트를 가져옵니다.
        List<Long> resumeInfoUids = workResumeInfoRepository.findResumeInfoUidByWorkUid(workUid);

        // 이력서 uid에서 이력서 정보를 가져옵니다.
        List<MyApplicantDetailRes> result = resumeInfoService.getMyApplicant(resumeInfoUids);

        // 이력서가 없다면 204
        if(result.size() == 0) return ResponseEntity.status(204).build();


        return ResponseEntity.status(200).body(
                result
        );
    }

    @GetMapping("/auth/job-search/{resumeInfoUid}/{workUid}")
    @ApiOperation(value = "지원자의 지원서 상세 조회", notes = "recruitmentUid를 통해 지원서를 상세 조회한 뒤, workUid를 이용하여 열람 여부를 변경합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyResumeInfo(@PathVariable Long resumeInfoUid, @PathVariable Long workUid) {
        //지원서 정보를 가져옵니다.
        Optional<ResumeInfo> resumeInfo = resumeInfoRepository.findById(resumeInfoUid);

        //dto로 변환합니다.
        ResumeInfoDetail resumeInfoDetail = ResumeInfoDetail.of(resumeInfo);

        //지원한 직무 정보를 가져옵니다.
        WorkResumeInfo workResumeInfo = workResumeInfoRepository.findByResumeInfoUidAndWorkUid(resumeInfoDetail.getUid(), workUid);

        //정보가 있다면
        if(workResumeInfo != null) {
            //이력서를 읽었음을 db에 저장합니다.
            workResumeInfo.setIsRead(LocalDateTime.now());
            workResumeInfoRepository.save(workResumeInfo);
        }

        // 이력서 상세 정보, 사용자 정보, 근무 이력 정보를 리턴합니다.
        ResumeInfoDetailRes resumeInfoDetailRes = ResumeInfoDetailRes.of(
                resumeInfoDetail,
                UserDetail.of(userRepository.findById(resumeInfo.get().getUser().getUid())),
                StaffRecordDetail.of(staffRecordRepository.findAllByUserUidAndIsActiveTrueOrderByStartDateDesc(resumeInfo.get().getUser().getUid())));
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
        // accessToken에서 userUid를 가져옵니다.
        Long userUid = userService.getUserUidFromAccessToken(request);

        // 게스트하우스 사장의 userUid를 가져옵니다.
        Long writerUid = workRepository.findUserUidByWorkUid(workUid);

        // 현재 접속한 사용자가 사장이 아니라면
        if(!Objects.equals(userUid,writerUid)) {
            return ResponseEntity.status(401).build();
        }

        // 직무를 삭제합니다.
        workRepository.deleteById(workUid);
        workResumeInfoRepository.deleteByWorkUid(workUid);
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
        // accessToken에서 userUid를 가져옵니다.
        Long userUid = userService.getUserUidFromAccessToken(request);

        // 직무를 작성한 userUid를 가져옵니다.
        Long writerUid = workRepository.findUserUidByWorkUid(modifyWorkPutReq.getWorkUid());

        // 다르다면 삭제할 권한이 없음을 알립니다.
        if(!Objects.equals(userUid, writerUid)) {
            return ResponseEntity.status(401).build();
        }

        // 수정합니다.
        workRepository.save(modifyWorkPutReq.toWork());
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/api/work/{workUid}")
    @ApiOperation(value = "직무 하나 조회", notes = "workUid를 이용해 직무 하나를 받아옵니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getOneWork(@PathVariable Long workUid) {
        return ResponseEntity.status(200).body(
                workRepository.findById(workUid).map(
                        // 직무와 직무 작성자의 uid를 리턴합니다.
                        work -> WorkRes.of(work,
                                workRepository.findUserUidByWorkUid(work.getUid())
                        )));
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
        // 페이지네이션 size = 15
        Pageable pageable = PageRequest.of(pageNumber-1, 15);

        // 스타일, 지역, 단어로 게스트하우스를 검색합니다.
        List<Long> guestHouseUidList = guestHouseRepositorySupport.searchGuestHouseUidWithFilter(styles, areaName, word);

        // 게스트 하우스가 없다면 400 return
        if(guestHouseUidList.size() == 0 || guestHouseUidList == null) return ResponseEntity.status(400).build();

        return ResponseEntity.status(200).body(
                // 게스트하우스의 직무와 사장의 uerUid를 가져옵니다.
                workRepository.findByGuestHouseUidAndEntryDate(guestHouseUidList, entryDate, pageable).map(
                        work -> WorkRes.of(work,
                                workRepository.findUserUidByWorkUid(work.getUid()))
                )
        );
    }

    @GetMapping("/auth/get-guest-house/{workUid}")
    @ApiOperation(value = "직무 uid로 게스트하우스 uid 조회", notes = "workUid를 통해 guestHouseUid를 받아옵니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST(검색 조건에 맞는 직무가 없습니다.)"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getGuestHouseUid(@PathVariable Long workUid) {
        return ResponseEntity.status(200).body(
                workRepository.findGuestHouseUidByWorkUid(workUid)
        );
    }
}
