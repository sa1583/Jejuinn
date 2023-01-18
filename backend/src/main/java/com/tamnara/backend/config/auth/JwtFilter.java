package com.tamnara.backend.config.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

   private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
   public static final String AUTHORIZATION_HEADER = "Authorization";
   private TokenProvider tokenProvider;
   public JwtFilter(TokenProvider tokenProvider) {
      this.tokenProvider = tokenProvider;
   }

   @Override
   public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
      logger.debug("Jwt filter start ");
      System.out.println("Jwt filter start");
      HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
      String jwt = resolveToken(httpServletRequest);
      System.out.println("jwt : "+jwt);
      String requestURI = httpServletRequest.getRequestURI();

      if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) { // 토큰이 유효하다면
         System.out.println("in if");
         Authentication authentication = tokenProvider.getAuthentication(jwt); // Authentication 객체(권한 정보들)를 가져온다.
         SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContext에 set한다.
         logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
      } else {
         System.out.println("in else");
         logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
      }

      filterChain.doFilter(servletRequest, servletResponse);
   }

   private String resolveToken(HttpServletRequest request) { // request header에서 token 정보를 가져옴
      String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
      System.out.println(bearerToken);

      if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
         return bearerToken.substring(7);
      }

      return null;
   }
}
