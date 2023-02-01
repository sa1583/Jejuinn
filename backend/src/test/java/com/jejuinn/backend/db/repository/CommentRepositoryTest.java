package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.service.CommentService;
import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.entity.GuestHouse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import java.nio.file.Paths;
import java.util.Date;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
//@EnableJpaAuditing
class CommentRepositoryTest {
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    CommentService commentService;

    @Test
    public void dateTest(){

        Comment c1 = Comment.builder()
                .postType("GUSE_HOUSE")
                .postUid(1L)
                .content("hihihi").build();
        System.out.println(c1.getDateCreated());
        commentRepository.save(c1);
        System.out.println(c1.getDateCreated());
        assertThat(c1.getDateCreated()).isEqualTo(commentRepository.findById(c1.getUid()).get().getDateCreated());
    }

    @Test
    public void dirtyCheckingTest(){
        Comment c1 = Comment.builder()
                .postType("GUSE_HOUSE")
                .postUid(1L)
                .content("hihihi").build();

        commentRepository.save(c1);

        Comment c2 = commentService.update(c1.getUid(), "New HIHI");

        Comment c3 = commentRepository.findById(c1.getUid()).get();

        assertThat(c3.getContent()).isEqualTo(c2.getContent());
    }

}