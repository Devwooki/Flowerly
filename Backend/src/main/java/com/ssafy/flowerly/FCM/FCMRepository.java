package com.ssafy.flowerly.FCM;

import com.ssafy.flowerly.entity.FCMToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FCMRepository extends JpaRepository<FCMToken, Long> {
}
