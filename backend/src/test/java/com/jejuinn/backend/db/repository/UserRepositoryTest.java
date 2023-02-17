package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.api.dto.request.email.OpenViduLinkReq;
import com.jejuinn.backend.db.entity.*;
import com.jejuinn.backend.db.repository.GuestHouseRepository;
import com.jejuinn.backend.db.repository.StaffRecordRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.exception.NoContentException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import java.util.Collections;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Rollback(value = false)
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    public void test(){
//        int u = 15;
//        String[] genders = {"남자", "여자"};
//        String name = "이현진";
//        String phone = "010-6638-7338";
//
//
//        User user = userRepository.findById(Long.valueOf(u)).get();
//        user.setGender(genders[1]);
//        user.setUsername(name);
//        user.setNickname(name);
//        user.setPhone(phone);


    }


}