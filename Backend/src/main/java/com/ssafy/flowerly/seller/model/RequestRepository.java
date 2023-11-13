package com.ssafy.flowerly.seller.model;

import com.ssafy.flowerly.entity.Flly;
import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.entity.Request;
import com.ssafy.flowerly.seller.vo.OrderRequestDto;
import io.lettuce.core.dynamic.annotation.Param;
import jdk.jfr.Registered;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    @Query(
            value = "SELECT NEW com.ssafy.flowerly.seller.vo.OrderRequestDto(r, " +
                    "(SELECT fp.imageUrl FROM FllyParticipation fp " +
                    "WHERE fp.flly.fllyId = r.flly.fllyId AND fp.seller.memberId = :memberId)) " +
                    "FROM Request r " +
                    "LEFT JOIN r.flly fl " +
                    "WHERE r.seller.memberId = :memberId " +
                    "AND (fl.progress = 'FINISH_ORDER' OR fl.progress = 'FINISH_MAKING') " +
                    "ORDER BY r.deliveryPickupTime",
            countQuery = "SELECT COUNT(r) FROM Request r " +
                    "WHERE r.seller.memberId = :memberId " +
                    "AND (r.flly.progress = 'FINISH_ORDER' OR r.flly.progress = 'FINISH_MAKING')"
    )
    Page<OrderRequestDto> findBySellerMemberIdOrderByDeliveryPickupTime(Long memberId, Pageable pageable);
    /*
    count 쿼리가 실제로 유효한지 검증해야 합니다.
    Spring Data JPA는 복잡한 JPQL 쿼리에 대한 count 쿼리를 자동으로 생성하기 어려울 수 있으므로,
    필요하다면 countQuery 옵션을 사용하여 count 쿼리를 직접 제공해야 할 수 있습니다.
     */

    Optional<Request> findBySellerMemberIdAndFllyFllyId(Long memberId, Long fllyId);

    Optional<Request> findByFllyAndSeller(Flly flly, Member seller);

    Optional<Request> findByRequestId(Long requestId);

    List<Request> findBySellerMemberId(@Param("memberId") Long memberId);

    Optional<Request> findByFllyFllyIdAndIsPaid(Long fllyId, Boolean isPaid);

    Optional<Request> findByFllyFllyIdAndIsPaidTrue(Long fllyId);

    @Query("SELECT rdi.address FROM RequestDeliveryInfo rdi " +
            " where rdi.request.requestId = :requestId ")
    String getAddress(@Param("requestId") Long requestId);
}
