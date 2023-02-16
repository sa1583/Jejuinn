package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * 스태프 기록 엔티티
 */
@Entity
@Table(name = "staff_records")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class StaffRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    private Long guestHouseUid;

    private Long userUid;

    @Column(length = 50)
    private String guestHouseName;

    @Column(length = 50)
    private String guestHouseAddress;

    @Column(length = 50)
    private String guestHouseAddressDetail;

    @Column(name = "username", length = 25)
    private String username;

    @Column(length = 50)
    private String userEmail;

    @CreationTimestamp
    private LocalDate startDate;

    private LocalDate endDate;

    @Column(length = 25)
    private String workName;

    private boolean isActive;

    public static StaffRecord of(User staff, GuestHouse guestHouse, String workName){
        return StaffRecord.builder()
                .guestHouseUid(guestHouse.getUid())
                .userUid(staff.getUid())
                .guestHouseName(guestHouse.getGuestHouseName())
                .guestHouseAddress(guestHouse.getAddress())
                .guestHouseAddressDetail(guestHouse.getAddressDetail())
                .username(staff.getUsername())
                .userEmail(staff.getEmail())
                .workName(workName)
                .isActive(true)
                .build();
    }
}
