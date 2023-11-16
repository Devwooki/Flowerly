package com.ssafy.flowerly.FCM.repository;

import com.ssafy.flowerly.entity.FCMToken;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FCMRepository extends MongoRepository<FCMToken, ObjectId> {
    Optional<FCMToken> findByMemberId(Long memberId);
}
