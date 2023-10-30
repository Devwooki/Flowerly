package com.ssafy.flowerly.chatting.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Document
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChattingMessageDto {
    @Id
    private String id;
    private Long chattingId;
    private Long memberId;
    private String content;
    private String type;
    private LocalDateTime sendTime;

    public ChattingMessageDto(Long chattingId, String type, Long memberId, String content) {
        this.chattingId = chattingId;
        this.type = type;
        this.memberId = memberId;
        this.content = content;
    }
}
