package com.ssafy.flowerly.chatting.dto;

import com.ssafy.flowerly.entity.ChattingMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.TimeZone;

public class ChattingMessageDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        private Long chattingId;
        private Long memberId;
        private String type;
        private String content;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private String messageId;
        private Long memberId;
        private String type;
        private String content;
        private String sendTime;

        public static ChattingMessageDto.Response of(ChattingMessage chattingMessage) {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM.dd HH:mm");  // 원하는 포맷을 설정합니다.
            formatter.setTimeZone(TimeZone.getTimeZone("Asia/Seoul")); // 한국 시간대를 설정합니다.
            String formattedTimeString = formatter.format(chattingMessage.getSendTime());  // Date 객체를 포맷된 문자열로 변환합니다.

            return Response.builder()
                    .messageId(chattingMessage.getId())
                    .memberId(chattingMessage.getMemberId())
                    .type(chattingMessage.getType())
                    .content(chattingMessage.getContent())
                    .sendTime(formattedTimeString)
                    .build();
        }
    }
}
