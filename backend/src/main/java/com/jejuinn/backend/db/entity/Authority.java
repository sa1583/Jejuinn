package com.jejuinn.backend.db.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 인증 엔티티
 * ROLE_USER, ROLE_ADMIN, ROLE_AUTH
 */
@Entity
@Table(name = "authority")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Authority {

   @Id
   @Column(name = "authority_name", length = 50)
   private String authorityName;

   public static Authority user(){
      return Authority.builder()
              .authorityName("ROLE_USER")
              .build();
   }

   public static Authority auth(){
      return Authority.builder()
              .authorityName("ROLE_AUTH")
              .build();
   }
}
