package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Image;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class ImageRepositoryTest {

    @Autowired
    private ImageRepository imageRepository;

    @Test
    public void getImgPathTest(){
        Image image1 = Image.builder()
                .postUid(1L)
                .postType("GUEST_HOUSE")
                .imgPath("image/GUEST_HOUSE/a9e6a053-052e-4c2e-be4e-d213bc05395f_aaa.jpg").build();
        imageRepository.save(image1);

        assertThat(imageRepository.findImgPathByUid(image1.getUid())).isEqualTo(image1.getImgPath());
    }

}