package com.jejuinn.backend.api.service;

import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.repository.CommentRepository;
import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    @Transactional
    public Comment update(final Long uid, String content) {
        Comment comment = commentRepository.findById(uid)
                .orElseThrow(() -> new UsernameNotFoundException("데이터베이스에서 찾을 수 없습니다."));

        comment.setContent(content);
        return comment;    // transaction이 종료되는 시점에 변경 필드 업데이트
    }
}
