package com.jejuinn.backend.api.service.social;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.jejuinn.backend.api.controller.SocialController;
import com.jejuinn.backend.api.dto.search.NaverLocalSearchRes;
import com.jejuinn.backend.api.service.UserService;
import com.jejuinn.backend.db.entity.Authority;
import com.jejuinn.backend.db.entity.SocialLogin;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.enums.SocialType;
import com.jejuinn.backend.db.repository.SocialLoginRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.api.dto.NaverProfileDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class NaverService {

    @Value("${social.naver.client.id}")
    private String NAVER_CLIENT_ID;

    @Value("${social.naver.client.secret}")
    private String NAVER_CLIENT_SECRET;

    @Value("${social.naver.url.search.local}")
    private String NAVER_LOCAL_SEARCH_URL;

    private final UserRepository userRepository;
    private final SocialLoginRepository socialLoginRepository;
    private final UserService userService;


    public User getUserInfoFromNaver(String code){
        JsonParser parser = new JsonParser();

        log.info("access token : {}", code);

        // 프로필 정보 요청
        String tmp = profileSearch(code);

        log.info("Get Profile Info !");

        // 응답 결과를 NaverProfileDto로 형태로 변환
        String[] fields = {"nickname", "name", "email", "gender", "age", "profile_image", "mobile"};
        JsonElement responseElement = parser.parse(tmp).getAsJsonObject().get("response").getAsJsonObject();
        Map<String, String> result = getMapFromNaverProfile(fields, responseElement);
        NaverProfileDto naverProfileDto = NaverProfileDto.init(result);

        Set<Authority> authorities = new HashSet<>();
        authorities.add(Authority.user());
        authorities.add(Authority.auth());

        User user = userRepository.findOneByEmailAndSocialLogin_Type(result.get("email"), SocialType.NAVER.ordinal())
                        .orElse(User.from(naverProfileDto, authorities));
//        logger.info("유저의 핸드폰 번호는 {}", user.getPhone());

        SocialLogin socialLogin = socialLoginRepository.findOneByUser_Uid(user.getUid())
                                    .orElse(SocialLogin.from(user, code, SocialType.NAVER.ordinal()));


        userRepository.save(user);
        socialLoginRepository.save(socialLogin);

        log.info("저장 완료");
        return user;
    }

    public User myUserInfoFromNaver(String code, Long userUid){
        JsonParser parser = new JsonParser();

//        logger.info("여기까지 잘 왔어요!!! {}", code);
        log.info("access token : {}", code);

        // 프로필 정보 요청
        String tmp = profileSearch(code);

        log.info("Get Profile Info !");

        // 응답 결과를 NaverProfileDto로 형태로 변환
        String[] fields = {"nickname", "name", "email", "gender", "age", "profile_image", "mobile"};
        JsonElement responseElement = parser.parse(tmp).getAsJsonObject().get("response").getAsJsonObject();
        Map<String, String> result = getMapFromNaverProfile(fields, responseElement);
        NaverProfileDto naverProfileDto = NaverProfileDto.init(result);

        Set<Authority> authorities = new HashSet<>();
        authorities.add(Authority.user());
        authorities.add(Authority.auth());

        User user = userService.NaverAuthUser(userUid, naverProfileDto, authorities);

//        logger.info("유저의 uid : {}",user.getUid());
//        logger.info("유저의 핸드폰 번호는 {}", user.getPhone());

        log.info("저장 완료");
        return user;
    }

    private Map<String, String> getMapFromNaverProfile(String[] fields, JsonElement responseElement) {
        Map<String, String> result = new HashMap<>();
        for (String field : fields) {
            result.put(field,
                        Optional.ofNullable(
                                responseElement.getAsJsonObject().get(field)
                                )
                                .orElse(new JsonObject()).toString().replaceAll("\\\"",""));
        }
        return result;
    }

    private String profileSearch(String access_token) {
        String header = "Bearer " + access_token; // Bearer 다음에 공백 추가
        try {
            String apiURL = "https://openapi.naver.com/v1/nid/me";
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", header);
            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode==200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer res = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                res.append(inputLine);
            }
            br.close();
            return res.toString();
        } catch (Exception e) {
            System.err.println(e);
            return "Err";
        }
    }


    public NaverLocalSearchRes getNameSearchResult(String query){
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        int display = 10;
        int  start = 1;
        String sort = "random";
        map.add("query", "제주도 "+query);
        map.add("display", String.valueOf(display));
        map.add("start", String.valueOf(start));
        map.add("sort", sort);



        var uri = UriComponentsBuilder
                .fromUriString(NAVER_LOCAL_SEARCH_URL)
                .queryParams(map)
                .build()
                .encode()
                .toUri();

        var headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", NAVER_CLIENT_ID);
        headers.set("X-Naver-Client-Secret", NAVER_CLIENT_SECRET);
        headers.setContentType(MediaType.APPLICATION_JSON);

        var httpEntity = new HttpEntity<>(headers);

        var responseType = new ParameterizedTypeReference<NaverLocalSearchRes>(){};

        var responseEntity = new RestTemplate()
                .exchange(
                        uri,
                        HttpMethod.GET,
                        httpEntity,
                        responseType
                );
        NaverLocalSearchRes result = responseEntity.getBody();
        log.info("gogo");

        result.getItems().stream().forEach(searchLocalItem -> {
            log.info("변환 전 : {}",searchLocalItem);
            searchLocalItem.setGeo();
            String tmp = searchLocalItem.getTitle();
            tmp = tmp.replaceAll("<b>", "").replaceAll("</b>", "");
            searchLocalItem.setTitle(tmp);
            log.info("변환 후 : {}",searchLocalItem);
        });
        return responseEntity.getBody();
    }
}
