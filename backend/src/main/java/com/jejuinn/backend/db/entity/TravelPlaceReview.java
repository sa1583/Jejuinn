package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "travel_place_reviews")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
public class TravelPlaceReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @NotNull
    private int starRating;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String content;

    @NotNull
    private int like;

    @CreationTimestamp
    private LocalDateTime dateCreated;

    @NotNull
    private Long travelPlaceUid;

    @ManyToOne
    @JoinColumn(name = "user_uid")
    @NotNull
    private User user;



}
