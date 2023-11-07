package com.ssafy.flowerly.review.service;


import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.entity.Request;
import com.ssafy.flowerly.entity.Review;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.review.dto.ReviewRequestDto;

import com.ssafy.flowerly.review.dto.ReviewDetailDto;
import com.ssafy.flowerly.review.dto.ReviewResponseDto;
import com.ssafy.flowerly.review.repository.ReviewRepository;
import com.ssafy.flowerly.seller.model.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final RequestRepository requestRepository;
    private final MemberRepository memberRepository;
    private final StoreInfoRepository storeInfoRepository;



    public Page<ReviewDetailDto> getReviewBySellerId(Pageable pageable, Long sellerId) {

        return reviewRepository.findReviewsBySeller_MemberIdAndIsRemovedFalse(pageable, sellerId).map(Review::toDetailDto);
    }



    public Page<ReviewResponseDto> getReviewByConsumerId(Pageable pageable, Long consumerId) {
        return reviewRepository.findByConsumerMemberIdAndIsRemovedFalse(pageable, consumerId)
                .map(review -> {

                    String storeName = storeInfoRepository.findStoreName(review.getSeller());

                    return ReviewResponseDto.builder()
                            .reviewId(review.getReviewId())
                            .requestId(review.getRequest().getRequestId())
                            .content(review.getContent())
                            .createdAt(review.getCreatedAt())
                            .storeName(storeName)
                            .build();
                });
    }

    @Transactional
    public void saveReview(ReviewRequestDto reviewRequestDto, Long memberId) {

        Request request = requestRepository.findByRequestId(reviewRequestDto.getRequestId())
                .orElseThrow(() -> new CustomException(ErrorCode.REQUEST_NOT_FOUND));

        Member seller = memberRepository.findByMemberId(reviewRequestDto.getSellerId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));

        Member consumer = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));

        Review review = Review.builder()
                .consumer(consumer)
                .request(request)
                .seller(seller)
                .content(reviewRequestDto.getContent())
                .isRemoved(false)
                .build();

        reviewRepository.save(review);



    }
}
