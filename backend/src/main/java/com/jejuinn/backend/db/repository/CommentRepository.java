package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPostTypeAndPostUidOrderByDateCreatedDesc(String postType, Long postUid);

    Optional<List<Comment>> findAllByUserUidOrderByDateCreatedDesc(Long userUid);
}
