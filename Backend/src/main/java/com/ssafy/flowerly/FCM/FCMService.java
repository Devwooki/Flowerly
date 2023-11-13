package com.ssafy.flowerly.FCM;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FCMService {
    private final FCMRepository fcmRepository;
    public void addToken(Long memberId, String fcmToken) {

    }
}
