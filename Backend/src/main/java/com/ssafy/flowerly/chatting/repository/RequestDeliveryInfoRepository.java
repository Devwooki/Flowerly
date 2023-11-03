package com.ssafy.flowerly.chatting.repository;

<<<<<<< Updated upstream
import com.ssafy.flowerly.entity.Request;
import com.ssafy.flowerly.entity.RequestDeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RequestDeliveryInfoRepository extends JpaRepository<RequestDeliveryInfo, Long> {
    Optional<RequestDeliveryInfo> findByRequest(Request request);
=======
import com.ssafy.flowerly.entity.RequestDeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestDeliveryInfoRepository extends JpaRepository<RequestDeliveryInfo, Long> {
>>>>>>> Stashed changes
}
