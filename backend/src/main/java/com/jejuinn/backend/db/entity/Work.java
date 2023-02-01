package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "works")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @ManyToOne
    @JoinColumn(name = "recruitment_uid")
    private Recruitment recruitment;

    private String workName;

    private int intake;

    private String gender;

    private int minWorkPeriod;

    private int daysPerWeek;

    @ElementCollection
    @CollectionTable(name = "work_days", joinColumns = @JoinColumn(name = "uid"))
    @Column(name = "day")
    private List<String> workDays;
}
