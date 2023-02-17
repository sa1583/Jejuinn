package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.InsertCommentPostReq;
import com.jejuinn.backend.api.dto.response.comment.GetCommentListPostRes;
import com.jejuinn.backend.api.service.CommentService;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.enums.PostType;
import com.jejuinn.backend.db.repository.CommentRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.exception.NoContentException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@Api(tags = "댓글 관련 기능 API")
@RequiredArgsConstructor
@Slf4j
public class CommentController {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
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
    public ResponseEntity<?> insertComment(HttpServletRequest request, @RequestBody @Valid InsertCommentPostReq req){
        // accessToken에서 사용자의 userUid를 가져옵니다.
        Long userUid = userService.getUserUidFromAccessToken(request);

        // dto를 comment entity로 변환 후 저장합니다.
        commentRepository.save(req.toComment(userUid));

        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/auth/comments/{uid}")
    @ApiOperation(value = "댓글 삭제", notes = "<strong>댓글의 uid</strong>을 입력받아 댓글을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteComment(@PathVariable Long uid){
        commentRepository.deleteById(uid);
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/auth/comment")
    @ApiOperation(value = "댓글 수정", notes = "<strong>댓글의 uid와 내용</strong>을 입력받아 댓글을 수정합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(수정 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> updateComment(@RequestParam Long uid, @RequestParam String content){
        commentService.update(uid, content);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/api/comment/{postType}/{postUid}")
    @ApiOperation(value = "댓글 리스트 조회", notes = "postType과 postUid를 입력받아 댓글을 리스트를 불러옵니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getCommentList(@PathVariable String postType, @PathVariable Long postUid) {
        return ResponseEntity.status(200).body(
                // 포스트 타입, 포스트 uid -> comment entity -> 댓글 + user 정보를 가진 dto로 변환 후 반환
                commentRepository.findAllByPostTypeAndPostUidOrderByDateCreatedDesc(postType, postUid).stream().map(
                        comment -> GetCommentListPostRes.of(comment, userRepository.findById(comment.getUserUid()).get())
                )
        );
    }

    @GetMapping("/auth/comment")
    @ApiOperation(value = "내가 쓴 댓글 리스트 조회", notes = "Header의 userUid를 통해 내가 쓴 댓글 리스트를 불러옵니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "데이터가 없습니다"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyCommentList(HttpServletRequest request) {
        // accessToken에서 userUid를 가져옵니다.
        Long userUid = userService.getUserUidFromAccessToken(request);

        // 나의 댓글 리스트를 가져옵니다.
        List<Comment> commentList = commentRepository.findAllByUserUidOrderByDateCreatedDesc(userUid)
                .orElseThrow(()-> new NoContentException("사용자가 작성한 댓글이 없습니다."));

        return ResponseEntity.status(200).body(commentList);
    }
}
