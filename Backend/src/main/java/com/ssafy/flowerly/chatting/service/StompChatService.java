package com.ssafy.flowerly.chatting.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class StompChatService {

    private final ConcurrentHashMap<Long, Long> memberStatus = new ConcurrentHashMap<>();

    // 사용자가 웹소켓에 연결될 때 호출됩니다.
    public void userConnected(Long memberId, Long chattingId) {
        memberStatus.put(memberId, chattingId);
//        System.out.println("memberStatus " + memberStatus);
    }

    // 사용자가 웹소켓에서 연결이 끊어질 때 호출됩니다.
    public void userDisconnected(Long memberId) {
        memberStatus.remove(memberId);
//        System.out.println("memberStatus " + memberStatus);
    }

    // 사용자의 연결 상태를 확인합니다.
    public boolean isUserConnected(Long memberId, Long chattingId) {
        if(memberStatus.containsKey(memberId) && memberStatus.get(memberId).equals(chattingId)) {
            return true;
        }
        return false;
    }

}