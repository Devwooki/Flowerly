package com.ssafy.flowerly.seller.model;

import com.ssafy.flowerly.entity.Request;
import jdk.jfr.Registered;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    Page<Request> findBySellerMemberIdOrderByCreatedAt(Long memberId, Pageable pageable);
}
