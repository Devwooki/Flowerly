package com.ssafy.flowerly.FCM;

import com.ssafy.flowerly.util.CustomResponse;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/api/fcm")
@RestController
@RequiredArgsConstructor
public class FCMController {
    private final FCMService fcmService;

    @PostMapping
    public CustomResponse setFCMToken(HttpServletRequest request, String fcmToken){
        Long memberId = (Long) request.getAttribute("memberId");
        fcmService.addToken(memberId, fcmToken);
        return new CustomResponse(HttpStatus.SC_OK, "토큰 등록성공");
    }
}
