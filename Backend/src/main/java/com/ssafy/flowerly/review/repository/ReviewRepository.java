package com.ssafy.flowerly.review.repository;

import com.ssafy.flowerly.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findReviewsBySeller_MemberIdAndIsRemovedFalse(Pageable pageable, Long sellerId);
}