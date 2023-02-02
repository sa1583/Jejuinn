package com.jejuinn.backend.config.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class TokenProvider implements InitializingBean {

   private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
   private static final String AUTHORITIES_KEY = "auth";
   private final String secret;
   private final long tokenValidityInMilliseconds;
   private Key key;

   public TokenProvider(
      @Value("${jwt.secret}") String secret,
      @Value("${jwt.token-validity-in-minutes}") long tokenValidityInMinutes) {
      this.secret = secret;
      this.tokenValidityInMilliseconds = tokenValidityInMinutes * 60 * 1000;
   }

   @Override
   public void afterPropertiesSet() { // secret 값을 decode 하여 key 값에 저장
      byte[] keyBytes = Decoders.BASE64.decode(secret);
      this.key = Keys.hmacShaKeyFor(keyBytes);
   }

   public String createToken(com.jejuinn.backend.db.entity.User user, long times) {

      long now = (new Date()).getTime();
      Date validity = new Date(now + this.tokenValidityInMilliseconds * times); // 만료 일자를 계산한다.

      String authorities = user.getAuthorities().stream().map(authority -> authority.getAuthorityName()).collect(Collectors.joining(","));
      return Jwts.builder()
              .setSubject(String.valueOf(user.getUid()))
              .claim(AUTHORITIES_KEY, authorities)
              .signWith(key, SignatureAlgorithm.HS512)
              .setExpiration(validity)
              .compact();
   }

   public Authentication getAuthentication(String token) { // 토큰을 입력받아 권한 정보를 리턴한다.
      Claims claims = Jwts
              .parserBuilder()
              .setSigningKey(key)
              .build()
              .parseClaimsJws(token)
              .getBody();

      Collection<? extends GrantedAuthority> authorities =
         Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());

      User principal = new User(claims.getSubject(), "", authorities);
      return new UsernamePasswordAuthenticationToken(principal, token, authorities); //
   }

   public boolean validateToken(String token) { // 토큰을 받아 유효성 검사를 실행
      try {
         Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
         return true;
      } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
         logger.info("잘못된 JWT 서명입니다.");
      } catch (ExpiredJwtException e) {
         logger.info("만료된 JWT 토큰입니다.");
      } catch (UnsupportedJwtException e) {
         logger.info("지원되지 않는 JWT 토큰입니다.");
      } catch (IllegalArgumentException e) {
         logger.info("JWT 토큰이 잘못되었습니다.");
      }
      return false;
   }

   public String createAccessToken(com.jejuinn.backend.db.entity.User user) {
      return createToken(user, 1);
   }

   public String createRefreshToken(com.jejuinn.backend.db.entity.User user) {
      return createToken(user, 14*24*2);
   }
}
