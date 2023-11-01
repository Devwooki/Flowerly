package com.ssafy.flowerly.chatting.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StompChatRequest {
    private Long chattingId;
    private Long memberId;
    private String type;
    private String content;
}
