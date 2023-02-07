package com.jejuinn.backend.api.service;

import com.jejuinn.backend.db.entity.GuestHouse;
import com.jejuinn.backend.db.entity.StaffRecord;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.repository.GuestHouseRepository;
import com.jejuinn.backend.db.repository.StaffRecordRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.exception.NoContentException;
import com.jejuinn.backend.exception.UnAuthorizationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffService {
    private final StaffRecordRepository staffRecordRepository;
    private final GuestHouseRepository guestHouseRepository;
    private final UserRepository userRepository;

    public List<StaffRecord> getMyStaffList(Long guestHouseUid, Long representativeUid){
        GuestHouse guestHouse = guestHouseRepository.findById(guestHouseUid)
                .orElseThrow(()-> new NoContentException("등록되지 않은 게스트하우스 입니다."));
        if(guestHouse.getRepresentativeUid() != representativeUid)
            throw new UnAuthorizationException("게스트 하우스의 권한이 없습니다.");
        return staffRecordRepository.findAllByGuestHouseUidOrderByStartDateDesc(guestHouseUid);
    }

    public List<StaffRecord> getMyActiveStaffList(Long guestHouseUid, Long representativeUid){
        GuestHouse guestHouse = guestHouseRepository.findById(guestHouseUid)
                .orElseThrow(()-> new NoContentException("등록되지 않은 게스트하우스 입니다."));
        if(guestHouse.getRepresentativeUid() != representativeUid)
            throw new UnAuthorizationException("게스트 하우스의 권한이 없습니다.");
        return staffRecordRepository.findAllByGuestHouseUidAndIsActiveTrueOrderByStartDateDesc(guestHouseUid);
    }

    @Transactional
    public StaffRecord doneMyStaff(Long guestHouseUid, final Long uid, Long userUid) {
        GuestHouse guestHouse = guestHouseRepository.findById(guestHouseUid)
                .orElseThrow(()-> new NoContentException("등록되지 않은 게스트하우스 입니다."));
        StaffRecord staff = staffRecordRepository.findById(uid)
                .orElseThrow(() -> new UsernameNotFoundException("데이터베이스에서 찾을 수 없습니다."));
        if(staff.getGuestHouseUid() != guestHouseUid)
            throw new UnAuthorizationException("해당 게스트 하우스의 스태프가 아닙니다.");

        if(guestHouse.getRepresentativeUid() != userUid && staff.getUserUid() != userUid)
            throw new UnAuthorizationException("업무 종료 권한이 없습니다.");
        staff.setEndDate(LocalDate.now());
        staff.setActive(false);
        return staff;    // transaction이 종료되는 시점에 변경 필드 업데이트
    }

    @Transactional
    public StaffRecord addMyStaff(Long guestHouseUid, Long representativeUid, Long userUid, String workName) {
        GuestHouse guestHouse = guestHouseRepository.findById(guestHouseUid)
                .orElseThrow(()-> new NoContentException("등록되지 않은 게스트하우스 입니다."));

        if(guestHouse.getRepresentativeUid() != representativeUid)
            throw new UnAuthorizationException("해당 게스트 하우스의 관리자가 아닙니다.");

        User staff = userRepository.findById(userUid)
                .orElseThrow(()-> new NoContentException());

        StaffRecord staffRecord = StaffRecord.of(staff, guestHouse, workName);
        staffRecordRepository.save(staffRecord);

        return staffRecord;
    }
}
