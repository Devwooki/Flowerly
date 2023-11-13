package com.ssafy.flowerly.FCM;

import com.ssafy.flowerly.entity.FCMToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FCMRepository extends MongoRepository<FCMToken, Long> {
}
