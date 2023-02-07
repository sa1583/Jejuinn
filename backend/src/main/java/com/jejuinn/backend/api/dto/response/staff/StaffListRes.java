package com.jejuinn.backend.api.dto.response.staff;

import com.jejuinn.backend.db.entity.StaffRecord;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffListRes {
    private Long uid;

    private Long guestHouseUid;

    private Long userUid;

    private String username;

    private String userEmail;

    private LocalDate startDate;

    private LocalDate endDate;

    private String workName;

    private boolean isActive;

    public static StaffListRes of(StaffRecord staff){
        if(staff == null) return null;
        return StaffListRes.builder()
                .uid(staff.getUid())
                .guestHouseUid(staff.getGuestHouseUid())
                .userUid(staff.getUserUid())
                .username(staff.getUsername())
                .userEmail(staff.getUserEmail())
                .startDate(staff.getStartDate())
                .endDate(staff.getEndDate())
                .workName(staff.getWorkName())
                .isActive(staff.isActive())
                .build();
    }
}
