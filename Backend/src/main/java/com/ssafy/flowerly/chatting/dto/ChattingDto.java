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
    public static class Request {
        private Long consumerId;
        private Long sellerId;
        private Long fllyId;
        private Long fllyParticipationId;

        public void setConsumerId(Long consumerId) {
            this.consumerId = consumerId;
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BasicResponse {
        private Long chattingId;
        private String lastChattingTime;
        private String lastChattingMessage;
        private Integer unreadCnt;
        private String chattingStatus;

        private Long opponentMemberId;
        private String opponentName;  // 채팅 상대 이름 (소비자인 경우 가게 이름, 판매자인 경우 소비자 닉네임?)
        private String imageUrl;

        public static ChattingDto.BasicResponse of(Chatting chatting, Integer unreadCnt, Long opponentMemberId, String opponentName, String imageUrl) {
            return BasicResponse.builder()
                    .chattingId(chatting.getChattingId())
                    .lastChattingMessage(chatting.getLastChattingMessage())
                    .lastChattingTime(chatting.getLastChattingTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm")))
                    .unreadCnt(unreadCnt)
                    .chattingStatus(String.valueOf(chatting.getChattingStatus()))
                    .opponentMemberId(opponentMemberId)
                    .opponentName(opponentName)
                    .imageUrl(imageUrl)
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
        private Boolean isValidRoom;  // 활성화된 채팅방인지 여부
        private String lastId;  // for pagination
        private List<ChattingMessageDto.Response> messages;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class UpdateResponse {
        private Long chattingId;
        private String lastChattingTime;
        private String lastChattingMessage;
        private Integer unreadCnt;

        public static ChattingDto.UpdateResponse of(Chatting chatting, Integer unreadCnt) {
            return UpdateResponse.builder()
                    .chattingId(chatting.getChattingId())
                    .lastChattingMessage(chatting.getLastChattingMessage())
                    .lastChattingTime(chatting.getLastChattingTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm")))
                    .unreadCnt(unreadCnt)
                    .build();
        }
    }


}
