package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.TravelPlaceReview;

import com.jejuinn.backend.db.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class UserRepositoryTest {
    @Autowired UserRepository userRepository;

    @Test
    @Rollback(value = false)
    public void userLikeTest(){
        User user = userRepository.findById(1L).get();
        user.getLikes().add(TravelPlaceReview.builder().uid(4L).build());

        User user2 = userRepository.findById(1L).get();
        for (TravelPlaceReview like : user2.getLikes()) {
            System.out.println(like.getUid());
            System.out.println(like.getContent());
        }
        assertThat(user.getLikes().size()).isEqualTo(user2.getLikes().size());
    }

    @Test
    public void deleteLikeTest(){
        User user = userRepository.findById(1L).get();
        user.setLikes(null);
    }

    @Test
    public void getLikeTest(){
        User user = userRepository.findById(1L).get();
        List<TravelPlaceReview> likes = user.getLikes();
        for (TravelPlaceReview like : likes) {
            System.out.println(like.getUid());
            System.out.println(like.getContent());
            System.out.println(like.getLikeCount());
        }
    }

}