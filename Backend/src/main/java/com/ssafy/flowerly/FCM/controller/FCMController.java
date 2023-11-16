package com.ssafy.flowerly.FCM.controller;

import com.ssafy.flowerly.FCM.service.FCMService;
import com.ssafy.flowerly.util.CustomResponse;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RequestMapping("/api/fcm")
@RestController
@RequiredArgsConstructor
@Slf4j
public class FCMController {
    private final FCMService fcmService;

    @PostMapping
    public DataResponse<?> setFCMToken(HttpServletRequest request,
                                    @RequestBody Map<String, Object> requestData){
        Long memberId = (Long) request.getAttribute("memberId");
        String fcmToken = (String) requestData.get("fcmToken");
        log.info("{}, {}", memberId, fcmToken);
        return new DataResponse<>(HttpStatus.SC_OK, "토큰 등록성공", fcmService.addToken(memberId, fcmToken));
    }

    @GetMapping("/test")
    public CustomResponse sendFCMMessage(HttpServletRequest request){
        Long memberId = (Long) request.getAttribute("memberId");
        fcmService.sendPushMessage(memberId, "김동민은 바보다", "수정이는 교수님이다.");
        return new CustomResponse(HttpStatus.SC_OK, "메세지 전송 성공!");
    }
}
