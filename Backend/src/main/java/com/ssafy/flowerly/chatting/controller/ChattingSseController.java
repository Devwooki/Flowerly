package com.ssafy.flowerly.chatting.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@RestController
@RequestMapping("/api/chatting")
@RequiredArgsConstructor
public class ChattingSseController {

    private final Map<Long, SseEmitter> clients = new ConcurrentHashMap<>();

    @GetMapping("/sse-list")
    public SseEmitter subscribe(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        log.info("{}번 유저 SSE 연결", memberId);

        SseEmitter emitter = new SseEmitter();
        this.clients.put(memberId, emitter);

        emitter.onCompletion(() -> this.clients.remove(memberId));
        emitter.onTimeout(() -> emitter.complete());
        emitter.onError((e) -> emitter.complete());

        return emitter;
    }

    public void sendToClients(Long memberId, Object data) {
        SseEmitter emitter = this.clients.get(memberId);

        if(emitter != null) {
            try {
                emitter.send(data, MediaType.APPLICATION_JSON);
            } catch (Exception e) {
                this.clients.remove(memberId);
            }
        }
    }

}
