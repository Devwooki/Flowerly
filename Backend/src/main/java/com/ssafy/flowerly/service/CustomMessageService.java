package com.ssafy.flowerly.service;

import com.ssafy.flowerly.dtos.KakaoMessageDto;
import org.springframework.stereotype.Service;

@Service
public class CustomMessageService {
    MessageService messageService;

    public boolean sendMyMessage() {
        KakaoMessageDto myMsg = new KakaoMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("메시지 테스트입니다.");

        String accessToken = KakaoAuthService.authToken;

        return messageService.sendMessage(accessToken, myMsg);
    }
}
