package com.tamnara.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

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

   @Column(name = "email", length = 50)
   private String email;

   @Column(name = "password", length = 100)
   private String password;

   @Column(name = "username", length = 25)
   private String username;

   @Column(name = "nickname", length = 25)
   @NotNull
   private String nickname;

   @Column(name = "email_receive_allow")
   @NotNull
   @ColumnDefault("true")
   private boolean emailReceiveAllow;

   @Column(name = "phone", length = 25, unique = true)
   private String phone;

   @Column(name = "age")
   private String age;

//   @Column(name = "date_created", columnDefinition = "DATETIME CURRENT_TIMESTAMP")
//   private Date dateCreated;

   @Column(name = "refresh_token")
   private String refreshToken;

   @ManyToMany
   @JoinTable(
      name = "user_authority",
      joinColumns = {@JoinColumn(name = "user_uid", referencedColumnName = "uid")},
      inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
   private Set<Authority> authorities;

   @OneToOne(mappedBy = "user")
   private SocialLogin socialLogin;
}
