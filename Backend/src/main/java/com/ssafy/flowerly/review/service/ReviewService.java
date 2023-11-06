package com.ssafy.flowerly.review.service;


import com.ssafy.flowerly.entity.Review;
import com.ssafy.flowerly.review.dto.ReviewResponseDto;

import com.ssafy.flowerly.review.dtos.ReviewDetailDto;
import com.ssafy.flowerly.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepostiroy;

    public List<ReviewResponseDto> getSellerReviews(Long sellerId) {
        return null;
    };

    public Page<ReviewDetailDto> getReviewBysellerId(Pageable pageable, Long sellerId) {

        return reviewRepostiroy.findReviewsBySeller_MemberIdAndIsRemovedFalse(pageable, sellerId).map(Review::toDetailDto);
    }

}
