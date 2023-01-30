package com.jejuinn.backend.db.entity;

import lombok.*;

import javax.persistence.*;

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

    private String address;

    private String addressDetail;
}
