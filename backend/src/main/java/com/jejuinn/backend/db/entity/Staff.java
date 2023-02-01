package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "staff")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    private Long guestHouseUid;

    private String guestHouseName;

    private String guestHouseAddress;

    private String guestHouseAddressDetail;

    private String userUid;

    private String userName;

    private String userEmail;

    @CreationTimestamp
    private LocalDate startDate;

    @UpdateTimestamp
    private LocalDate endDate;

    private String workName;
}
