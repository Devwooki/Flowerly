package com.ssafy.flowerly.chatting.dto;

import com.ssafy.flowerly.entity.Chatting;
import com.ssafy.flowerly.entity.ChattingMessage;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class ChattingDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BasicResponse {
        private Long chattingId;
        private String lastChattingTime;
        private String lastChattingMessage;
        private Integer unreadCnt;

        private Long opponentMemberId;
        private String opponentName;  // 채팅 상대 이름 (소비자인 경우 가게 이름, 판매자인 경우 소비자 닉네임?)

        public static ChattingDto.BasicResponse of(Chatting chatting, Integer unreadCnt, Long opponentMemberId, String opponentName) {
            return BasicResponse.builder()
                    .chattingId(chatting.getChattingId())
                    .lastChattingMessage(chatting.getLastChattingMessage())
                    .lastChattingTime(chatting.getLastChattingTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm")))
                    .unreadCnt(unreadCnt)
                    .opponentMemberId(opponentMemberId)
                    .opponentName(opponentName)
                    .build();
        }
    }


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RoomResponse {
        private Long chattingId;
        private Long opponentMemberId;
        private String opponentName;
        private String lastId;
        private List<ChattingMessageDto.Response> messages;
    }

}
