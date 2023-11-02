package com.ssafy.flowerly.chatting.controller;

import com.ssafy.flowerly.chatting.dto.StompChatRequest;
import com.ssafy.flowerly.chatting.service.ChattingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StompChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChattingService chattingService;

    @MessageMapping("/message/{chattingId}")
    public void chat(@DestinationVariable Long chattingId, StompChatRequest stompChatRequest) {
        simpMessagingTemplate.convertAndSend("/sub/message/" + chattingId, stompChatRequest);
        chattingService.saveChattingMessage(stompChatRequest);
        log.info("채팅 메세지 전송 성공");
    }
}
