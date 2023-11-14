package com.ssafy.flowerly.seller.model;


import com.ssafy.flowerly.entity.FllyParticipation;
import com.ssafy.flowerly.seller.vo.FllyResponeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface FllyParticipationRepository extends JpaRepository<FllyParticipation, Long> {

    @Query("SELECT fp FROM FllyParticipation fp LEFT JOIN fp.flly fy ON fp.flly.fllyId = fy.fllyId " +
                    "WHERE fp.seller.memberId = :memberId AND (fy.progress = 'START' OR fy.progress = 'DISCUSSION') " +
                    " AND fy.isCanceled = false " +
                    "AND fy.consumer.role != 'DELETE' " )
    Page<FllyParticipation> findBySellerMemberIdParticipationDto(Long memberId, Pageable pageable);

//    Optional<FllyParticipation> findByFllyFllyIdAndSellerMemberId(long fllyId, long memberId);


    Optional<FllyParticipation> findByFllyFllyIdAndSellerMemberId(long memberId, long fllyId);

    @Query("select si, fp from FllyParticipation fp " +
            " left join fetch StoreInfo si on fp.seller.memberId = si.seller.memberId " +
            " where fp.flly.fllyId = :fllyId ")
    Page<Object[]> findFlistByFllyId(Pageable pageable,
                                     @Param("fllyId") Long fllyId);

}
