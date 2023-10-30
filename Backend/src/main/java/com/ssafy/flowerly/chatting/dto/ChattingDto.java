package com.ssafy.flowerly.chatting.dto;

import com.ssafy.flowerly.entity.Chatting;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChattingDto {
    private Long chattingId;
    private LocalDateTime lastChattingTime;
    private String lastChattingMessage;

    private Long opponentMemberId;
    private String opponentName;  // 채팅 상대 이름 (소비자인 경우 가게 이름, 판매자인 경우 소비자 닉네임?)

    public static ChattingDto of(Chatting chatting, Long opponentMemberId, String opponentName) {
        return ChattingDto.builder()
                .chattingId(chatting.getChattingId())
                .lastChattingMessage(chatting.getLastChattingMessage())
                .lastChattingTime(chatting.getLastChattingTime())
                .opponentMemberId(opponentMemberId)
                .opponentName(opponentName)
                .build();
    }
}
