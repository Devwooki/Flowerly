package com.ssafy.flowerly.seller.model;


import com.ssafy.flowerly.entity.StoreDeliveryRegion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreDeliveryRegionRepository extends JpaRepository<StoreDeliveryRegion, Long> {

    Optional<List<StoreDeliveryRegion>> findBySellerMemberId (Long memberId);

}
