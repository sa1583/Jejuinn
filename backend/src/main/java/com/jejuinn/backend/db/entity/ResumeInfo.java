package com.jejuinn.backend.db.entity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class ResumeInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @ManyToMany
    @JoinTable(
            name = "ResumeInfo_person_type_join",
            joinColumns = {@JoinColumn(name = "ResumeInfo_uid", referencedColumnName = "uid")},
            inverseJoinColumns = {@JoinColumn(name = "type", referencedColumnName = "type")})
    private List<PersonType> tags;
}
