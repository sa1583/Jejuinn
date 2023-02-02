package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "travel_places")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
public class TravelPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @NotNull
    @Column(length = 50)
    private String name;

    @NotNull
    @Column(length = 10)
    private String category;

    @Column(length = 50)
    private String address;

    @Column(length = 50)
    private String addressDetail;

    private double lat;

    private double lng;

    private int reviewCount;

    private double starRatingAvg;
}
