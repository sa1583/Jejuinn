package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * 게스트 하우스 엔티티
 */
@Entity
@Table(name = "guest_house")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class GuestHouse {
    @Id
    @Column(name = "uid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @Column(length = 50)
    private String guestHouseName;

    private Long representativeUid;

    private String email;

    private String phone;

    @Column(columnDefinition = "TEXT")
    private String introduction;

    private String tags;

    private String address;

    @Column(length = 255)
    private String addressDetail;

    @CreationTimestamp
    private LocalDate dateCreated;
}
