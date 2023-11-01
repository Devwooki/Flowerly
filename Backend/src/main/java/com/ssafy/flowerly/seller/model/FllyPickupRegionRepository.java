package com.ssafy.flowerly.seller.model;

import com.ssafy.flowerly.entity.Dong;
import com.ssafy.flowerly.entity.FllyPickupRegion;
import com.ssafy.flowerly.entity.Sigungu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FllyPickupRegionRepository extends JpaRepository<FllyPickupRegion, Long> {

    @Query(
            "SELECT pr FROM PickupRegion pr " +
                    "Left Join Flly fy ON fy.fllyId = pr.flly.fllyId " +
                    "WHere ( pr.sigungu IN :sigunguList OR pr.dong IN :dongList ) " +
                    "AND fy.deadline > current_timestamp AND fy.isCanceled = false " +
                    "order by fy.deadline "
    )
    Page<FllyPickupRegion> getSellerPickupAbleList(List<Sigungu> sigunguList, List<Dong> dongList, Pageable pageable);
}
