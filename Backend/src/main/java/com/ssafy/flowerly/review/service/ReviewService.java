package com.ssafy.flowerly.review.service;

import com.ssafy.flowerly.entity.Review;
import com.ssafy.flowerly.review.dtos.ReviewDetailDto;
import com.ssafy.flowerly.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;


    public Page<ReviewDetailDto> getReviewBysellerId(Pageable pageable, Long sellerId) {
        return reviewRepository.findReviewsBySeller_MemberIdAndIsRemovedFalse(pageable, sellerId).map(Review::toDetailDto);
    }
}
