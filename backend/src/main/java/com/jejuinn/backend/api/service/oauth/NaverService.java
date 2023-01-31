package com.jejuinn.backend.api.service.oauth;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.jejuinn.backend.db.entity.Authority;
import com.jejuinn.backend.db.entity.SocialLogin;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.enums.SocialType;
import com.jejuinn.backend.db.repository.SocialLoginRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.api.dto.NaverProfileDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class NaverService {

    @Value("${social.NAVER_CLIENT_ID}")
    private String NAVER_CLIENT_ID;

    @Value("${social.NAVER_CLIENT_SECRET}")
    private String NAVER_CLIENT_SECRET;
    private final UserRepository userRepository;
    private final SocialLoginRepository socialLoginRepository;


    /**
     * Naver login 구현부
     *
     * @param code
     * @param state
     * @return
     */

    public User getUserInfoFromNaver(String code, String state){
        JsonParser parser = new JsonParser();

        log.info("access token : {}", code);

        // 프로필 정보 요청
        String tmp = profileSearch(code);

        log.info("Get Profile Info ! : {}", tmp);

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

        log.info("User 정보! : {}", user);

        SocialLogin socialLogin = socialLoginRepository.findOneByUser_Uid(user.getUid())
                                    .orElse(SocialLogin.from(user, code, SocialType.NAVER.ordinal()));

        log.info("socialLogin 정보! : {}", socialLogin);

        System.out.println(user);
        System.out.println(socialLogin);

        userRepository.save(user);
        socialLoginRepository.save(socialLogin);

        return user;
    }

    private Map<String, String> getMapFromNaverProfile(String[] fields, JsonElement responseElement) {
        Map<String, String> result = new HashMap<>();
        for (String field : fields) {
            result.put(field,
                        Optional.ofNullable(
                                responseElement.getAsJsonObject().get(field)
                                )
                                .orElse(new JsonObject()).toString());
            System.out.println(result.get(field));
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
}
