package com.jejuinn.backend.db.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "guest_house")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @Column(name = "uid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long uid;

    @Column(name = "post_type")
    private String postType; // GUEST_HOUSE or STAFF_PICK

    @Column(name = "post_uid")
    private Long postUid;

    @Column(name = "user_uid")
    private Long userUid;

    @Column(name = "content")
    private String content ;

    @Column(name = "is_staff")
    private boolean isStaff;

    @Column(name = "dateCreated")
    private Date dateCreated;







}
