package com.jejuinn.backend.api.service.s3;

import com.jejuinn.backend.db.entity.Image;
import com.jejuinn.backend.db.repository.ImageRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import java.io.IOException;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class S3UploaderTest {
    @Autowired
    private S3Uploader s3Uploader;
    @Autowired
    private ImageRepository imageRepository;

    @Test
    public void deleteTest(){
        Image image1 = Image.builder()
                .postUid(1L)
                .postType("GUEST_HOUSE")
                .imgPath("image/GUEST_HOUSE/cea323c0-9afb-4fa1-abd0-ec0f205a8bb3_11.png").build();
        imageRepository.save(image1);

        try {
            s3Uploader.delete(image1.getUid());
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("erorororjsdf;kajnsdmlfkjasfkljasklfjl");
            return ;
        }

        assertThat(1).isEqualTo(1);

    }

}