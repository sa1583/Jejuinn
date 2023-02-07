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

    }

}