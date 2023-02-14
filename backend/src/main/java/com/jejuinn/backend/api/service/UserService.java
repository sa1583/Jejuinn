package com.jejuinn.backend.api.service;

import com.jejuinn.backend.api.dto.NaverProfileDto;
import com.jejuinn.backend.api.dto.request.user.SignupPostReq;
import com.jejuinn.backend.api.dto.response.resumeinfo.MyApplicantRes;
import com.jejuinn.backend.db.entity.Authority;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.db.repository.UserRepositorySupport;
import com.jejuinn.backend.exception.DuplicateMemberException;
import com.jejuinn.backend.config.jwt.JwtFilter;
import com.jejuinn.backend.config.jwt.TokenProvider;
import com.jejuinn.backend.exception.NoContentException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final UserRepositorySupport userRepositorySupport;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User signup(SignupPostReq userRegisterPostReq) {

        if(userRepository.findOneByEmailAndSocialLogin(userRegisterPostReq.getEmail(), null).orElse(null) != null){
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        userRegisterPostReq.setPassword(passwordEncoder.encode(userRegisterPostReq.getPassword()));


        User user = userRepository.save(SignupPostReq.from(userRegisterPostReq, Collections.singleton(authority)));
        log.info("USER UID : {}",user.getUid());

        return user;
    }

    public HttpHeaders getHttpHeaders(User user, String token) {

        String accessToken = tokenProvider.createAccessToken(user);

        String refreshToken = token;
        if(refreshToken == null){
            refreshToken = tokenProvider.createRefreshToken(user);
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.ACCESS_HEADER, "Bearer " + accessToken);
        httpHeaders.add(JwtFilter.REFRESH_HEADER, "Bearer " + refreshToken);

        log.info("토큰 재발급 ");
        log.info("ACCESS : {}",accessToken);
        log.info("REFRESH : {}", refreshToken);
        log.info("user UID : {}", user.getUid());

        userRepositorySupport.saveRefreshToken(user.getUid(), refreshToken);

        log.info("save refresh token");
        return httpHeaders;
    }

    public Long getUserUidFromAccessToken(HttpServletRequest request){
        String accessToken = request.getHeader(JwtFilter.ACCESS_HEADER);
        Authentication authentication = tokenProvider.getAuthentication(accessToken.substring(7));
        String uid = authentication.getName();
        if(uid == null) return null;
        return Long.parseLong(uid);
    }

    @Transactional
    public void updateSugarContent(double point, long uid){
        User user = userRepository.findById(uid)
                .orElseThrow(()->new NoContentException("사용자가 아닙니다."));
        log.info("사용자 평점(감귤 당도) UPDATE : BEFORE : {}", user.getSugarContent());

        double sum = user.getSugarContent()+point;
        double updatePoint = (sum > 10) ? 10 : (sum < 0) ? 0 : sum;
        user.setSugarContent(updatePoint);

        log.info("사용자 평점(감귤 당도) UPDATE : AFTER : {}", user.getSugarContent());
    }

    @Transactional
    public User NaverAuthUser(Long userUid, NaverProfileDto naverProfileDto, Set<Authority> authorities) {
        Optional<User> user = userRepository.findById(userUid);
        if(user.isPresent()) {
            user.get().setAge(naverProfileDto.getAge());
            user.get().setAuthorities(authorities);
            user.get().setGender(naverProfileDto.getGender());
            user.get().setNickname(naverProfileDto.getNickname());
            user.get().setPhone(naverProfileDto.getMobile());
            user.get().setStaff(false);
            user.get().setUsername(naverProfileDto.getName());
            user.get().setProfileImageUrl(naverProfileDto.getProfileImage());
        }
        return user.get();
    }
}
