package com.ssafy.flowerly.seller.model;

import com.ssafy.flowerly.entity.Request;
import jdk.jfr.Registered;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    @Query(
            "SELECT r FROM Request r " +
                    "left join Flly fl on r.flly.fllyId = fl.fllyId " +
                    "Where r.seller.memberId = :memberId " +
                    " AND fl.progress != 'FINISH_DELIVERY' " +
                    "ORDER BY r.deliveryPickupTime "
    )
    Page<Request> findBySellerMemberIdOrderByDeliveryPickupTime(Long memberId, Pageable pageable);


    Optional<Request> findBySellerMemberIdAndFllyFllyId(Long memberId, Long fllyId);


}
