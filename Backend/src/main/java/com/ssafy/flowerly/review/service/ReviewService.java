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
import java.time.format.DateTimeFormatter;
import java.util.Optional;

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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return reviewRepository.findByConsumerMemberIdAndIsRemovedFalse(pageable, consumerId)
                .map(review -> {

                    String storeName = storeInfoRepository.findStoreName(review.getSeller());
                    Long storeId = storeInfoRepository.findSellerMemberIdByMemberId(review.getSeller().getMemberId());

                    return ReviewResponseDto.builder()
                            .reviewId(review.getReviewId())
                            .requestId(review.getRequest().getRequestId())
                            .content(review.getContent())
                            .createdAt(review.getCreatedAt() != null ? review.getCreatedAt().format(formatter) : null)
                            .storeName(storeName)
                            .storeId(storeId)
                            .build();
                });
    }

    @Transactional
    public void saveReview(ReviewRequestDto reviewRequestDto, Long memberId) {

        Request request = requestRepository.findByRequestId(reviewRequestDto.getRequestId())
                .orElseThrow(() -> new CustomException(ErrorCode.REQUEST_NOT_FOUND));

        Member seller = request.getSeller();

        System.out.println("Seller info: " + seller);

        Member consumer = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        // consumer 검증
        if (!consumer.equals(request.getFlly().getConsumer())) {
            throw new CustomException(ErrorCode.CONSUMER_NOT_REVIEWER);
        }

        // 리뷰 중복 등록 방지

        Optional<Review> existingReview = reviewRepository.findByRequestAndConsumerAndIsRemovedFalse(request, consumer);
        if (existingReview.isPresent()) {
            throw new CustomException(ErrorCode.REVIEW_ALREADY_EXISTS);

        }

        Review review = Review.builder()
                .consumer(consumer)
                .request(request)
                .seller(seller)
                .content(reviewRequestDto.getContent())
                .isRemoved(false)
                .build();

        reviewRepository.save(review);



    }

    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findByReviewIdAndIsRemovedFalse(reviewId)
                .orElseThrow(() -> new CustomException(ErrorCode.REVIEW_NOT_FOUND));

        review.markAsRemoved();
        reviewRepository.save(review);

        System.out.println("Review info: " + review);
    }
}
