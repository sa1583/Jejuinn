package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.dto.response.recommender.RecommendWorkDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class RecommendRepositorySupportTest {
    @Autowired RecommendRepositorySupport recommendRepositorySupport;


    @Test
    public void getWorkInfoTest(){
        RecommendWorkDto work = recommendRepositorySupport.getWorkInfo(7L);

        System.out.println(work.getArea());
        System.out.println(work.getPersonTypes().get(0));
        assertThat(work.getPersonTypes().size()).isNotEqualTo(0);

    }

}