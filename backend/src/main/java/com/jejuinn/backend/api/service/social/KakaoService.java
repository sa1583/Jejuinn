package com.jejuinn.backend.api.service.social;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.jejuinn.backend.db.entity.Authority;
import com.jejuinn.backend.db.entity.SocialLogin;
import com.jejuinn.backend.db.entity.User;
import com.jejuinn.backend.db.enums.SocialType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.*;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class KakaoService {

    /**
     * 카카오 소셜 로그인 구현부
     * @param access_token
     * @return
     */

    public SocialLogin getUserInfoFromKakao(String access_token){
        String reqUrl = "https://kapi.kakao.com/v2/user/me";
        JsonElement element = null;

        try {
            URL url = new URL(reqUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + access_token);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);


            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while((line = br.readLine())!=null) {
                result += line;
            }

//            System.out.println("resopnse body =" + result);

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            element = parser.parse(result);

        } catch (IOException e) {
            e.printStackTrace();
        }

        // from kakao_account
        JsonObject jsonObject = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

        Optional<JsonElement> email = Optional.ofNullable(jsonObject.get("email"));
        Optional<JsonElement> age = Optional.ofNullable(jsonObject.get("age_range"));
        Optional<JsonElement> gender = Optional.ofNullable(jsonObject.get("gender"));

        // from profile
        JsonObject profile = jsonObject.get("profile").getAsJsonObject();
        String name = profile.get("nickname").getAsString();
        String profileImageUrl = profile.get("profile_image_url").getAsString();


        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();
        String gender2 = null;
        if(getFromOptional(gender) == null) {
            gender2 = "무관";
        } else {
            if(getFromOptional(gender).equals("male")) {
                gender2 = "남자";
            } else if(getFromOptional(gender).equals("female")) {
                gender2 = "여자";
            } else {
                gender2 = "무관";
            }
        }
        User user = User.builder()
                        .email(getFromOptional(email))
                        .age(getFromOptional(age))
                        .gender(gender2)
                        .nickname(name)
                        .profileImageUrl(profileImageUrl)
                        .sugarContent(8)
                        .authorities(Collections.singleton(authority))
                        .build();


        return SocialLogin.builder()
                .user(user)
                .type(SocialType.valueOf("KAKAO").ordinal())
                .accessToken(access_token)
                .build();
    }

    /**
     * element가 null이라면 null을 아니라면 string으로 변환하는 메소드
     * 해결점 : element.get() == null이라면, getAsString()에서 오류가 발생
     * @param element
     * @return
     */

    private String getFromOptional(Optional<JsonElement> element) {
        return element.isEmpty() ? null : element.get().getAsString();
    }
}
