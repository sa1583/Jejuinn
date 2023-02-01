package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
//import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
//import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
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

    @CreationTimestamp
    private LocalDateTime dateCreated;







}
