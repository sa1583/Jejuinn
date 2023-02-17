package com.jejuinn.backend.api.service;

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

import javax.transaction.Transactional;

import java.util.Collections;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class EmailServiceTest {

    @Autowired private EmailService emailService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GuestHouseRepository guestHouseRepository;


    @Test
    public void emailTest(){
//        Long guestHouseUid = 28L;
//        Long userUid = 1L;
//        String url = "www.naver.com";
//
//        OpenViduLinkReq req = OpenViduLinkReq.builder()
//                .url(url)
//                .guestHouseUid(guestHouseUid)
//                .userUid(userUid).build();
//
//        User user = userRepository.findById(req.getUserUid()).orElseThrow(()-> new UsernameNotFoundException("사용자 정보가 없습니다."));
//
//        if(user.getEmail() == null) return;
//
//        GuestHouse guestHouse = guestHouseRepository.findById(req.getGuestHouseUid()).orElseThrow(()->new NoContentException("게스트 하우스가 없습니다."));
//
//        try {
//            emailService.sendMessage(user.getEmail(), req.getUrl(), guestHouse);
//        } catch (Exception e) {
//            e.printStackTrace();
//            System.out.println("FAIL");
//            return ;
//        }
//        System.out.println("DONE");
    }
}