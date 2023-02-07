package com.jejuinn.backend.api.service;

import com.jejuinn.backend.db.entity.*;
import com.jejuinn.backend.db.repository.GuestHouseRepository;
import com.jejuinn.backend.db.repository.StaffRecordRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import javax.transaction.Transactional;

import java.util.Collections;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class StaffServiceTest {
    @Autowired
    StaffService staffService;
    @Autowired
    GuestHouseRepository guestHouseRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    StaffRecordRepository staffRecordRepository;

    @Test
    public void addStaffTest(){

        GuestHouse guestHouse = GuestHouse.builder()
                .guestHouseName("Test Name")
                .address("제주시 애월읍 테스트면")
                .addressDetail("테스트로 23번길")
                .area(Area.builder().areaName("애월읍").build())
                .representativeUid(1L)
                .tags("#즐거운#서핑#카페")
                .build();

        User staff = User.builder()
                .authorities(Collections.singleton(Authority.builder().authorityName("ROLE_USER").build()))
                .email("test@example.com")
                .password("testpwd")
                .username("장정민")
                .nickname("hello")
                .build();

        guestHouseRepository.save(guestHouse);
        userRepository.save(staff);

        System.out.println(staff.getUid());
        System.out.println(guestHouse.getUid());
        StaffRecord staff2 = staffService.addMyStaff(guestHouse.getUid(), 1L, staff.getUid(), "청소");
        System.out.println(staff2.getUid());
        System.out.println(staff2.getUsername());
        System.out.println(staff2.getStartDate());
        System.out.println(staff2.getUserEmail());

        StaffRecord staff1 = staffRecordRepository.findById(staff2.getUid()).get();

        assertThat(staff1.getUsername()).isEqualTo(staff2.getUsername());
    }

}