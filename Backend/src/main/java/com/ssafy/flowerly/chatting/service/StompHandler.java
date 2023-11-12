package com.ssafy.flowerly.chatting.service;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.chatting.service.ChattingService;
import com.ssafy.flowerly.chatting.service.StompChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
    private final StompChatService stompChatService;
    private final JWTService jwtService;
    private final ChattingService chattingService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT == accessor.getCommand()) {
            log.info("CONNECT preSend");
            String accessToken = accessor.getFirstNativeHeader("Authorization");
            String chattingIdStr = accessor.getFirstNativeHeader("chattingId");

            if(accessToken != null && chattingIdStr != null) {
                Long chattingId = Long.parseLong(chattingIdStr);
                Long memberId = jwtService.extractMemberId(accessToken).get();
                stompChatService.userConnected(memberId, chattingId);
                chattingService.readChattingMessage(memberId, chattingId);
            }
        } else if(StompCommand.SUBSCRIBE == accessor.getCommand()) {
            log.info("SUBSCRIBE preSend");
        } else if(StompCommand.DISCONNECT == accessor.getCommand() || StompCommand.ERROR == accessor.getCommand()) {
            log.info("DISCONNECT preSend");
            String accessToken = accessor.getFirstNativeHeader("Authorization");

            if(accessToken != null) {
                Long memberId = jwtService.extractMemberId(accessToken).get();
                stompChatService.userDisconnected(memberId);
            }
        }

        return message;
    }

}
