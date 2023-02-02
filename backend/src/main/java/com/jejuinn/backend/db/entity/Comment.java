package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 댓글 엔티티
 */
@Entity
@Table(name = "comments")
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

    @Column(name = "post_type", length = 25)
    private String postType; // GUEST_HOUSE or STAFF_PICK

    @Column(name = "post_uid")
    private Long postUid;

    @Column(name = "user_uid")
    private Long userUid;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content ;

    @CreationTimestamp
    private LocalDateTime dateCreated;
}
