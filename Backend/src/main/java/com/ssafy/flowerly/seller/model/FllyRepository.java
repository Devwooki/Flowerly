package com.ssafy.flowerly.seller.model;

import com.ssafy.flowerly.entity.Flly;
import com.ssafy.flowerly.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FllyRepository extends JpaRepository<Flly, Long> {
    Optional<Flly> findByFllyId (Long fllyId);
}
