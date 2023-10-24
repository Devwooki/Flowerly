package com.ssafy.flowerly.service;

import com.ssafy.flowerly.dtos.KakaoMessageDto;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static com.ssafy.flowerly.service.HttpCallService.APP_TYPE_URL_ENCODED;

@Service
@Slf4j
public class MessageService extends HttpCallService{
    private static final String MSG_SEND_SERVICE_URL = "https://kapi.kakao.com/v2/api/talk/memo/default/send";
    private static final String SEND_SUCCESS_MSG = "메시지 전송에 성공했습니다.";
    private static final String SEND_FAIL_MSG = "메시지 전송에 실패했습니다.";

    private static final String SUCCESS_CODE = "0"; //kakao api에서 return해주는 success code 값

    public boolean sendMessage(String accessToken, KakaoMessageDto msgDto) {
        JSONObject linkObj = new JSONObject();
        linkObj.put("web_url", msgDto.getWebUrl());
        linkObj.put("mobile_web_url", msgDto.getMobileUrl());

        JSONObject templateObj = new JSONObject();
        templateObj.put("object_type", msgDto.getObjType());
        templateObj.put("text", msgDto.getText());
        templateObj.put("link", linkObj);
        templateObj.put("button_title", msgDto.getBtnTitle());


        HttpHeaders header = new HttpHeaders();
        header.set("Content-Type", APP_TYPE_URL_ENCODED);
        header.set("Authorization", "Bearer " + accessToken);

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("template_object", templateObj.toString());

        HttpEntity<?> messageRequestEntity = httpClientEntity(header, parameters);

        String resultCode = "";
        ResponseEntity<String> response = httpRequest(MSG_SEND_SERVICE_URL, HttpMethod.POST, messageRequestEntity);
        JSONObject jsonData = new JSONObject(response.getBody());
        resultCode = jsonData.get("result_code").toString();

        return successCheck(resultCode);
    }

    public boolean successCheck(String resultCode) {
        if(resultCode.equals(SUCCESS_CODE)) {
            log.info(SEND_SUCCESS_MSG);
            return true;
        }else {
            log.debug(SEND_FAIL_MSG);
            return false;
        }

    }

}
