package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 *
 */
@Entity
@Table(name = "recruitment_resume_info_join")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class RecruitmentResumeInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @ManyToOne
    @JoinColumn(name = "recruitment_uid")
    private Recruitment recruitment;

    @ManyToOne
    @JoinColumn(name = "resume_info_uid")
    private ResumeInfo resumeInfo;
}
