package com.ssafy.flowerly.seller.model;

import com.ssafy.flowerly.entity.Dong;
import com.ssafy.flowerly.entity.FllyDeliveryRegion;
import com.ssafy.flowerly.entity.Sido;
import com.ssafy.flowerly.entity.Sigungu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FllyDeliveryRegionRepository extends JpaRepository<FllyDeliveryRegion, Long> {


        @Query(
                "SELECT fr FROM FllyDeliveryRegion fr " +
                        " Left JOIN Flly fy ON fr.flly.fllyId = fy.fllyId " +
                        " Where ( fr.dong IN :dongList " +
                        " OR fr.sigungu IN :sigunguList " +
                        " OR fr.sido IN :sidoList )" +
                        " AND fy.isCanceled = false AND fy.deadline > current_timestamp " +
                        " order by fy.deadline "
        )
        Page<FllyDeliveryRegion> getSellerDeliverAbleList(List<Sido> sidoList, List<Sigungu> sigunguList, List<Dong> dongList, Pageable pageable);
}
