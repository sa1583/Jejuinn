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
@Table(name = "guest_houses")
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

    @Column(length = 50)
    private String email;

    @Column(length = 25)
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String introduction;

    @Column(length = 100)
    private String tags;

    @Column(length = 50)
    private String address;

    @Column(length = 50)
    private String addressDetail;

    private double lat;

    private double lng;

    @OneToOne
    @JoinColumn(name = "area_name")
    private Area area;

    @CreationTimestamp
    private LocalDate dateCreated;
}
