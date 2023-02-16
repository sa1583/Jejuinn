package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "resume_infos")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class ResumeInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_uid")
    private User user;

    @ManyToMany
    @JoinTable(
            name = "ResumeInfo_person_type_join",
            joinColumns = {@JoinColumn(name = "ResumeInfo_uid", referencedColumnName = "uid")},
            inverseJoinColumns = {@JoinColumn(name = "type", referencedColumnName = "type")})
    private List<PersonType> personTypes;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDate possibleStartDate;

    private int minWorkPeriod;

    private boolean autoApply;

    private String guestHouseType;

    @CreationTimestamp
    private LocalDate dateCreated;

    private boolean isDeleted;

    @Column(length = 50)
    private String instagramLink;

    @ManyToMany
    @JoinTable(
            name = "resume_info_area_join",
            joinColumns = {@JoinColumn(name = "resume_info_uid", referencedColumnName = "uid")},
            inverseJoinColumns = {@JoinColumn(name = "area_name", referencedColumnName = "area_name")})
    private List<Area> interestAreas;
}
