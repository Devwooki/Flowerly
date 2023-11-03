package com.ssafy.flowerly.seller.model;

import com.ssafy.flowerly.entity.Flly;
import com.ssafy.flowerly.entity.Request;
import com.ssafy.flowerly.seller.vo.OrderRequestDto;
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
            "SELECT new com.ssafy.flowerly.seller.vo.OrderRequestDto(r, fp.imageUrl) FROM Request r " +
                    "left join Flly fl on r.flly.fllyId = fl.fllyId " +
                    "left join FllyParticipation fp on r.flly.fllyId = fp.flly.fllyId " +
                    "Where r.seller.memberId = :memberId " +
                    " AND (fl.progress = 'FINISH_ORDER' OR fl.progress = 'FINISH_MAKING')  " +
                    "ORDER BY r.deliveryPickupTime "
    )
    Page<OrderRequestDto> findBySellerMemberIdOrderByDeliveryPickupTime(Long memberId, Pageable pageable);


    Optional<Request> findBySellerMemberIdAndFllyFllyId(Long memberId, Long fllyId);

    Optional<Request> findByFlly(Flly flly);
}
