package com.ssafy.flowerly.FCM.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.ssafy.flowerly.FCM.repository.FCMRepository;
import com.ssafy.flowerly.config.FCMConfig;
import com.ssafy.flowerly.entity.FCMToken;
import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FCMService {
    private final FCMRepository fcmRepository;
    private final FCMConfig fcmConfig;
    private final MemberRepository memberRepository;

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

    /** 알림 전송 매소드
     * @Param receiverId : 알림 받을 대상
     * @Param title : Push 알림 헤더
     * @Parma body : push 내용
     * */
    public void sendPushMessage(Long receiverId, String title, String body){

        Member findMember = memberRepository.findByMemberId(receiverId).orElse(null);

        //알림을 수신받지 않으면 종료시킨다
        if(!findMember.isNotification()) return;

        FCMToken memberTokenInfo = fcmRepository.findByMemberId(receiverId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        fcmConfig.sendByTokenList(memberTokenInfo.getTokens(), title, body);
    }
}
