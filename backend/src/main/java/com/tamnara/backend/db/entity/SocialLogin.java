package com.tamnara.backend.db.entity;

import com.tamnara.backend.db.enums.SocialType;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "social_logins")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@ToString
public class SocialLogin {
    @Id
    @Column(name = "uid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long uid;

    @OneToOne
    @JoinColumn(name = "user_uid")
    private User user;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "type")
    private int type;

}
