package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "guest_house")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GuestHouse {
    @Id
    @Column(name = "uid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    private String guestHouseName;

    private Long representativeUid;

    private String email;

    private String phone;

    private String introduction;

    private String tags;

    private String address;

    private String addressDetail;

    @CreationTimestamp
    private LocalDate dateCreated;
}