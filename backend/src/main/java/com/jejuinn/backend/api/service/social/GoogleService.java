package com.jejuinn.backend.api.service.social;

import com.jejuinn.backend.db.entity.Authority;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.enums.SocialType;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.jejuinn.backend.db.entity.SocialLogin;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class GoogleService {


    public SocialLogin getUserInfoFromGoogle(String access_token) {
        String reqUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
        ObjectNode node = null;
        User user = null;
        try {
            // header에 accessToken을 담는다.
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", access_token);

            // HttpEntity를 생성해 헤더에 담아 restTemplate으로 구글과 통신한다.
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity(headers);
            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
            factory.setReadTimeout(5000); // 읽기시간초과, ms
            factory.setConnectTimeout(3000); // 연결시간초과, ms
            HttpClient httpClient = HttpClientBuilder.create().setMaxConnTotal(100) // connection pool 적용
                    .setMaxConnPerRoute(5) // connection pool 적용
                    .build();

            // 동기 실행에 사용될 HttpClient 세팅
            factory.setHttpClient(httpClient);

            RestTemplate restTemplate = new RestTemplate(factory);
            ResponseEntity<String> response = restTemplate.exchange(reqUrl, HttpMethod.GET, request, String.class);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode newNode = null;
            newNode = mapper.readTree(response.getBody());
            node = ((ObjectNode) newNode).put("Authentication", "Successful");

            // email과 nickname 추출
            System.out.println(node);
            String email = new ObjectMapper().writeValueAsString(node.get("email"));
            System.out.println(email);
            String nickname = new ObjectMapper().writeValueAsString(node.get("name"));
            System.out.println(nickname);
            email = email.substring(1, email.length() - 1);
            nickname = nickname.substring(1, nickname.length() - 1);

            Authority authority = Authority.builder()
                    .authorityName("ROLE_USER")
                    .build();

            user = User.builder()
                    .email(email)
                    .nickname(nickname)
                    .sugarContent(8)
                    .authorities(Collections.singleton(authority))
                    .build();

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }



        return SocialLogin.builder()
                .user(user)
                .type(SocialType.valueOf("GOOGLE").ordinal())
                .accessToken(access_token)
                .build();
    }
}
