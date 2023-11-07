package com.ssafy.flowerly.chatting.repository;

import com.ssafy.flowerly.entity.Chatting;
import com.ssafy.flowerly.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChattingRepository extends JpaRepository<Chatting, Long> {
    List<Chatting> findAllByConsumerAndIsRemovedConsumerFalse(Member consumer);
    List<Chatting> findAllBySellerAndIsRemovedSellerFalse(Member seller);
}
