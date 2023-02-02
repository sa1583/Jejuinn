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

    @Column(length = 25)
    private String workName;

    private int intake;

    @Column(length = 10)
    private String gender;

    private int minWorkPeriod;

    private int daysPerWeek;

    @Column(length = 50)
    private String workTime;

    @ElementCollection
    @CollectionTable(name = "work_days", joinColumns = @JoinColumn(name = "uid"))
    @Column(name = "day")
    private List<String> workDays;
}
