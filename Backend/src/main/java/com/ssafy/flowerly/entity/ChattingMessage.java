package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.chatting.dto.StompChatRequest;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

@Data
@Document(collection = "chatting_message")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ChattingMessage {
    @Id
    private String id;
    private Long chattingId;
    private Long memberId;
    private String content;
    private String type;
    private Date sendTime;

    public static ChattingMessage toEntity(StompChatRequest dto) {
        return ChattingMessage.builder()
                .chattingId(dto.getChattingId())
                .memberId(dto.getMemberId())
                .content(dto.getContent())
                .type(dto.getType())
                .sendTime(Date.from(ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toInstant()))
                .build();
    }
}
