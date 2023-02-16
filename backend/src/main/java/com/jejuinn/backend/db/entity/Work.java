package com.jejuinn.backend.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
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
    @Column(name="uid")
    private Long uid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruitment_uid")
    private Recruitment recruitment;

    @Column(name = "work_name", length = 25)
    private String workName;

    @Column(name = "intake")
    private int intake;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "min_work_period")
    private int minWorkPeriod;

    @Column(name = "work_time", length = 50)
    private String workTime;

    @Column(name = "work_days")
    private int workDays;

    @Column(name = "days_off")
    private int daysOff;

    @Column(name = "work_description", length = 255)
    private String workDescription;

    @Column(name = "salary", length = 25)
    private String salary;

    @Column(name = "entry_date")
    private LocalDate entryDate;

    @JsonIgnore
    @OneToMany(mappedBy = "work", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<WorkResumeInfo> workResumeInfos = new ArrayList<>();

}
