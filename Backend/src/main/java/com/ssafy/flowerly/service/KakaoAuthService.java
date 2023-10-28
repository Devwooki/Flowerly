package com.ssafy.flowerly.service;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Service
@Slf4j
public class KakaoAuthService extends HttpCallService {
    private static final String AUTH_URL = "httsp://kauth.kakao.com/ouauth/token";
    public static String authToken;


//    public boolean getKakaoAuthToken(String code)  {
//        HttpHeaders header = new HttpHeaders();
//        String accessToken = "";
//        String refrashToken = "";
//        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
//
//        header.set("Content-Type", APP_TYPE_URL_ENCODED);
//
//        parameters.add("code", code);
//        parameters.add("grant_type", "authorization_code");
//        parameters.add("client_id", apiKey);
//        parameters.add("redirect_url", "");
//        parameters.add("client_secret", clientSecretKey);
//
//        HttpEntity<?> requestEntity = httpClientEntity(header, parameters);
//
//        ResponseEntity<String> response = httpRequest(AUTH_URL, HttpMethod.POST, requestEntity);
//        JSONObject jsonData = new JSONObject(response.getBody());
//        accessToken = jsonData.get("access_token").toString();
//        refrashToken = jsonData.get("refresh_token").toString();
//        if(accessToken.isEmpty() || refrashToken.isEmpty()) {
//            log.debug("토큰발급에 실패했습니다.");
//            return false;
//        }else {
//            authToken = accessToken;
//            return true;
//        }
//    }

}
