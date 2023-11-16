package com.ssafy.flowerly.chatting.repository;

import com.ssafy.flowerly.entity.Chatting;
import com.ssafy.flowerly.entity.Flly;
import com.ssafy.flowerly.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ChattingRepository extends JpaRepository<Chatting, Long> {
    Optional<Chatting> findByFllyParticipationFllyParticipationId(Long participationId);
    List<Chatting> findAllByConsumerAndIsRemovedConsumerFalseOrderByLastChattingTimeDesc(Member consumer);
    List<Chatting> findAllBySellerAndIsRemovedSellerFalseOrderByLastChattingTimeDesc(Member seller);

    List<Chatting> findAllByFlly(Flly flly);
}
