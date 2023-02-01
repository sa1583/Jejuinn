package com.jejuinn.backend.db.entity;

import com.jejuinn.backend.api.dto.NaverProfileDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.Set;

/**
 * 사용자 엔티티
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@ToString
public class User {

   @Id
   @Column(name = "uid")
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long uid;

   @Column(name = "email", length = 50, unique = true)
   private String email;

   @Column(name = "password", length = 100)
   private String password;

   @Column(name = "username", length = 25)
   private String username;

   @Column(name = "nickname", length = 10)
   @NotNull
   private String nickname;

   @Column(name = "phone", length = 25)
   private String phone;

   @Column(name = "age")
   private String age;

   @Column(name = "gender")
   private String gender;

   private boolean isStaff;

   @Column(name = "profile_image_url")
   private String profileImageUrl;

   @Column(name = "refresh_token")
   private String refreshToken;

   @NotNull
   private int sugarContent; //감귤당도 : 1 ~ 20, start: 8 단위 브릭스

   @ManyToMany
   @JoinTable(
      name = "user_authority",
      joinColumns = {@JoinColumn(name = "user_uid", referencedColumnName = "uid")},
      inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
   private Set<Authority> authorities;

   @OneToOne(mappedBy = "user")
   private SocialLogin socialLogin;


   public static User from(NaverProfileDto naverProfileDto, Set<Authority> authorities) {
      if(naverProfileDto == null) return null;

      return User.builder()
              .email(naverProfileDto.getEmail())
              .age(naverProfileDto.getAge())
              .gender(naverProfileDto.getGender())
              .nickname(naverProfileDto.getNickname())
              .username(naverProfileDto.getName())
              .profileImageUrl(naverProfileDto.getProfileImage())
              .phone(naverProfileDto.getMobile())
              .isStaff(false)
              .authorities(authorities)
              .build();
   }
}
