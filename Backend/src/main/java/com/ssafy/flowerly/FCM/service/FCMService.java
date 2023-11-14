package com.ssafy.flowerly.FCM.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.ssafy.flowerly.FCM.repository.FCMRepository;
import com.ssafy.flowerly.config.FCMConfig;
import com.ssafy.flowerly.entity.FCMToken;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FCMService {
    private final FCMRepository fcmRepository;

    private final FCMConfig fcmConfig;

    @Transactional
    public FCMToken addToken(Long memberId, String fcmToken) {
        return fcmRepository.findByMemberId(memberId)
                .map(temp -> {
                    //현재 토큰이 존재하는 것인지 체크
                    List<String> memberTokens = temp.getTokens();
                    for(String hasToken : memberTokens){
                        //같은 토큰을 보유하고 있으면 종료
                        if(fcmToken.equals(hasToken)){
                            return temp;
                        }
                    }
                    //없으면 추가하고 업데이트
                    temp.addToken(fcmToken);
                    return fcmRepository.save(temp);
                })
                .orElseGet(() -> {
                            FCMToken newTokenInfo = new FCMToken(memberId, fcmToken);
                            return fcmRepository.save(newTokenInfo);
                        });
    }

    public void sendPushMessage(Long receiverId, String title, String body){
        FCMToken memberTokenInfo = fcmRepository.findByMemberId(receiverId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));

        fcmConfig.sendByTokenList(memberTokenInfo.getTokens(), title, body);
    }
}
