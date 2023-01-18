package com.tamnara.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity // 기본적인 웹 보안을 활성화하겠다는 의미이다.
@EnableMethodSecurity
@Configuration
/*
추가적인 설정을 위한 방법 2가지
1. WebSecurityConfigurer를 implements
2. WebSecurityConfigurerAdapter를 extends
 */
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                // enalbe h2-console
                .headers()
                .frameOptions()
                .sameOrigin()

                .and()
                .authorizeRequests() // HttpServletRequest를 사용하는 요청들에 대한 접근 제한을 설정하겠다는 의미
                .antMatchers("/test","/v2/api-docs/**", "/swagger-ui/**", "/swagger-resources/**").permitAll() // '/api/hello'에 대한 접근은 허용하겠다라는 의미
                .anyRequest().authenticated(); // 나머지 요청에 대해서는 인증을 받아야한다는 의미
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/h2-console/**"
                ,"/favicon.ico");
    }

}
