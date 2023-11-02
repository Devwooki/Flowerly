package com.ssafy.flowerly.seller.model;


import com.ssafy.flowerly.entity.FllyParticipation;
import com.ssafy.flowerly.seller.vo.FllyResponeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface FllyParticipationRepository extends JpaRepository<FllyParticipation, Long> {

    @Query("SELECT fp FROM FllyParticipation fp LEFT JOIN fp.flly fy ON fp.flly.fllyId = fy.fllyId " +
                    "WHERE fp.seller.memberId = :memberId AND (fy.progress = 'START' OR fy.progress = 'DISCUSSION')" +
                    " AND fy.deadline > :currentDateTime AND fy.isCanceled = false ")
    Page<FllyParticipation> findBySellerMemberIdParticipationDto(Long memberId, Pageable pageable, LocalDateTime currentDateTime);

    Optional<FllyParticipation> findByFllyFllyId(long fllyId);

    Optional<FllyParticipation> findByFllyFllyIdAndSellerMemberId(long fllyId, long memberId);
}
