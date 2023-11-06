package com.ssafy.flowerly.review.repository;

import com.ssafy.flowerly.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findReviewsBySeller_MemberIdAndIsRemovedFalse(Pageable pageable, Long sellerId);
    List<Review> findBySellerMemberIdAndIsRemovedFalse(Long sellerId); //판매자 리뷰목록 조회
    List<Review> findByConsumerMemberIdAndIsRemovedFalse(Long consumerId); // 구매자 리뷰 목록 조회

}
