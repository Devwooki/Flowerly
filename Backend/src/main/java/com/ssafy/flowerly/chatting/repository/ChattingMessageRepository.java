package com.ssafy.flowerly.chatting.repository;

import com.ssafy.flowerly.entity.ChattingMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChattingMessageRepository extends MongoRepository<ChattingMessage, String> {
    List<ChattingMessage> findAllByChattingIdOrderBySendTime(Long chattingId);
}
