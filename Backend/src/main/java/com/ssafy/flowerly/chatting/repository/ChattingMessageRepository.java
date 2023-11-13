package com.ssafy.flowerly.chatting.repository;

import com.ssafy.flowerly.entity.ChattingMessage;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChattingMessageRepository extends MongoRepository<ChattingMessage, ObjectId> {
    Slice<ChattingMessage> findAllByChattingId(Long chattingId, Pageable pageable);

    // 마지막으로 읽은 메시지의 ID 이후의 메시지들을 가져오는 메서드
    @Query(value = "{'_id': { '$lt': ?0}")
    Slice<ChattingMessage> findChattingMessagesByIdBeforeAndChattingId(ObjectId lastId, Long chattingId, Pageable pageable);
}
