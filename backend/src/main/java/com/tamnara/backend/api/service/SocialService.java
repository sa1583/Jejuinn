package com.tamnara.backend.api.service;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.tamnara.backend.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SocialService {

    @Value("${social.KAKAO_REST_API_KEY}")
    private String KAKAO_API_KEY;

    public String getKaKaoAccessToken(String code){
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try{
            URL url = new URL(reqURL);
            System.out.println(code);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id="); // TODO REST_API_KEY 입력
            sb.append(KAKAO_API_KEY);
            sb.append("&redirect_uri=http://localhost:8080/api/users/social/kakao"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + code);
            System.out.println(sb);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);
            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        }catch (IOException e) {
            e.printStackTrace();
            System.out.println("끼엵....");
            return null;
        }
        return access_Token;
    }

    public HashMap<String, String> getUserInfo(String access_token) {

        HashMap<String, String> userInfo = new HashMap<>();
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

            System.out.println("resopnse body =" + result);

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


        User user = User.builder()
                        .email(getFromOptional(email))
                        .age(getFromOptional(age))
                        .

        userInfo.put("email",  getFromOptional(email));
        userInfo.put("name", name);

        return userInfo;
    }

    private String getFromOptional(Optional<JsonElement> element) {
        return element.isEmpty() ? null : element.get().getAsString();
    }
}
