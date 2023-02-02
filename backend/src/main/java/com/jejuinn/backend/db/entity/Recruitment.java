package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * 구인글 엔티티
 */
@Entity
@Table(name = "recruitments")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Recruitment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @Column(length = 50)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String welfare;

    @Column(columnDefinition = "TEXT")
    private String addInfo;

    @CreationTimestamp
    private LocalDateTime dateCreated;

    @UpdateTimestamp
    private LocalDateTime dateUpdated;

    @ManyToMany
    @JoinTable(
            name = "recruitment_person_type_join",
            joinColumns = {@JoinColumn(name = "recruitment_uid", referencedColumnName = "uid")},
            inverseJoinColumns = {@JoinColumn(name = "type", referencedColumnName = "type")})
    private List<PersonType> wanted;
}
