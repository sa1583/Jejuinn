package com.jejuinn.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * 소셜 로그인 엔티티
 */
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
    private Long uid;

    @OneToOne
    @JoinColumn(name = "user_uid")
    private User user;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "type", length = 25)
    private int type;


    public static SocialLogin from(User user, String accessToken, int type) {
        if(user == null) return null;

        return SocialLogin.builder()
                .user(user)
                .accessToken(accessToken)
                .type(type)
                .build();
    }
}
