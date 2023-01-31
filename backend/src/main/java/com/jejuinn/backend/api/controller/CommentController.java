package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.InsertCommentPostReq;
import com.jejuinn.backend.api.service.CommentService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.db.enums.PostType;
import com.jejuinn.backend.db.repository.CommentRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

@RestController
@Api(tags = "댓글 관련 기능 API")
@RequiredArgsConstructor
public class CommentController {

    private final CommentRepository commentRepository;
    private final CommentService commentService;
    private final UserService userService;

    /**
     *
     * @param request
     * @param req
     * @return
     */
    @PostMapping("/auth/comment")
    @ApiOperation(value = "댓글 추가", notes = "<strong>부모 글의 종류, uid와 댓글 내용</strong>을 입력받아 댓글을 저장합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertComment(HttpServletRequest request, @RequestBody InsertCommentPostReq req){
        Long userUid = userService.getUserUidFromAccessToken(request);

        // 타입 체크
        if(PostType.valueOf(req.getPostType()) == null) return ResponseEntity.status(400).build();

        // userUid 정보를 통해 staff 여부를 확인 차후 구현
        boolean isStaff = false;
        commentRepository.save(req.toComment(userUid, isStaff));

        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/auth/comment/{uid}")
    @ApiOperation(value = "댓글 삭제", notes = "<strong>댓글의 uid</strong>을 입력받아 댓글을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteComment(@PathVariable String uid){
        commentRepository.deleteById(Long.parseLong(uid));
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/comment")
    @ApiOperation(value = "댓글 수정", notes = "<strong>댓글의 uid와 내용</strong>을 입력받아 댓글을 수정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateComment(@RequestParam String uid, @RequestParam String content){
        commentService.update(Long.parseLong(uid), content);
        return ResponseEntity.status(200).build();
    }
}
