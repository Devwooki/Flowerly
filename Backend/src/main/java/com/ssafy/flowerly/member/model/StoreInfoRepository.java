package com.ssafy.flowerly.member.model;

import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.entity.StoreInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StoreInfoRepository extends JpaRepository<StoreInfo, Long> {
    @Query("SELECT s.storeName FROM StoreInfo s WHERE s.seller = :seller")
    String findStoreName(@Param("seller") Member seller);

    Optional<StoreInfo> findBySellerMemberId(Long memberId);

    @Query( "Select info, img From StoreInfo info " +
            " Left Join StoreImage img ON info.seller.memberId = img.seller.memberId " +
            " Where info.seller.memberId = :memberId "
    )
    List<Object[]> findBySellerInfo(@Param("memberId") Long memberId);

    @Query(" select si.storeName from StoreInfo si " +
            " where si.seller.memberId = :memberId ")
    String findStoreName (@Param("memberId") Long memberId);

    @Query("SELECT s.seller.memberId FROM StoreInfo s WHERE s.seller.memberId = :memberId")
    Long findSellerMemberIdByMemberId(@Param("memberId") Long memberId);
}



