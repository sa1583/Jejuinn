package com.jejuinn.backend.db.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class StaffPerformEval {
    @Id
    private Long uid;

    private Long userUid;

    private Long guestHouseUid;

    private Long staffRecordUid;

    private int score; // 1 ~ 5점의 평점

}
