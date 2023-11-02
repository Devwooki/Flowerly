package com.ssafy.flowerly.member.model;

import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.entity.StoreInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StoreInfoRepository extends JpaRepository<StoreInfo, Long> {
    @Query("SELECT s.storeName FROM StoreInfo s WHERE s.seller = :seller")
    String findStoreName(Member seller);

    StoreInfo findBySellerMemberId(Long memberId);
}
