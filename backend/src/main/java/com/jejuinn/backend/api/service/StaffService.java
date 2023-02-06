package com.jejuinn.backend.api.service;

import com.jejuinn.backend.db.entity.Comment;
import com.jejuinn.backend.db.entity.StaffRecord;
import com.jejuinn.backend.db.repository.CommentRepository;
import com.jejuinn.backend.db.repository.StaffRecordRepository;
import com.jejuinn.backend.exception.UnAuthorizationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class StaffService {
    private final StaffRecordRepository staffRecordRepository;

    @Transactional
    public StaffRecord done(Long guestHouseUid,final Long uid) {
        StaffRecord staff = staffRecordRepository.findById(uid)
                .orElseThrow(() -> new UsernameNotFoundException("데이터베이스에서 찾을 수 없습니다."));
        if(staff.getGuestHouseUid() != guestHouseUid) throw new UnAuthorizationException("스태프에 대한 권한이 없습니다.");
        staff.setWorking(false);
        return staff;    // transaction이 종료되는 시점에 변경 필드 업데이트
    }
}
