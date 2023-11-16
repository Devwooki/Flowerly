package com.ssafy.flowerly.chatting.repository;

import com.ssafy.flowerly.entity.Request;
import com.ssafy.flowerly.entity.RequestDeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RequestDeliveryInfoRepository extends JpaRepository<RequestDeliveryInfo, Long> {
    Optional<RequestDeliveryInfo> findByRequest(Request request);

    Optional<RequestDeliveryInfo> findByRequestRequestId(Long requestId);

    @Query("SELECT rdi.address FROM RequestDeliveryInfo rdi WHERE rdi.request.requestId = :requestId")
    Optional<String> findAddressByRequestId(@Param("requestId") Long requestId);
}

