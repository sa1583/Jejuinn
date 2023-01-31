package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPostTypeAndPostUid(String postType, Long postUid);
}
