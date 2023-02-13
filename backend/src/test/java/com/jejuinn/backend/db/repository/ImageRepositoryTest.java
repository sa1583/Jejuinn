package com.jejuinn.backend.db.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class ImageRepositoryTest {
    @Autowired ImageRepository imageRepository;

    @Test
    public void test(){
        List<String> url = imageRepository.findImgPathByPostTypeAndPostUid("REVIEW", 4L).get();
        assertThat(url.get(0)).isEqualTo("image/REVIEW/bf63110d-8ea0-4674-a425-484fbe10df20_BF.32266145.1.jpg");
    }

}