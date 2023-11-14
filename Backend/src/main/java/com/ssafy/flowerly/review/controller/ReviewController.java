package com.ssafy.flowerly.review.controller;

import com.ssafy.flowerly.review.dto.ReviewDetailDto;
import com.ssafy.flowerly.review.dto.ReviewRequestDto;
import com.ssafy.flowerly.review.service.ReviewService;
import com.ssafy.flowerly.util.CustomResponse;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // 판매자 리뷰 목록
    @GetMapping("/store-review")
    public DataResponse<?> getSellerReview(HttpServletRequest request,
                                     Pageable pageable){
        Long sellerId = (Long) request.getAttribute("memberId");
        return new DataResponse<>(HttpStatus.SC_OK, "리뷰를 반환합니다. page : " + pageable.getOffset(),  reviewService.getReviewBySellerId(pageable, sellerId));
    }

    @GetMapping("/buyer-review")
    public CustomResponse getBuyerReview(HttpServletRequest request, Pageable pageable){
        Long consumerId = (Long) request.getAttribute("memberId");
        return new DataResponse<>(HttpStatus.SC_OK, "리뷰를 반환합니다. page : " + pageable.getOffset(),  reviewService.getReviewByConsumerId(pageable, consumerId));
    }





    @PostMapping("/create")
    public CustomResponse saveReview(HttpServletRequest request, @RequestBody ReviewRequestDto reviewRequestDto) {
        Long memberId = (Long) request.getAttribute("memberId");
        reviewService.saveReview(reviewRequestDto, memberId);

        return new CustomResponse(200, "리뷰 저장 성공");
    }

    @DeleteMapping("/delete/{reviewId}")
    public CustomResponse deleteReview(HttpServletRequest request, @PathVariable Long reviewId) {
        Long memberId = (Long) request.getAttribute("memberId");
        reviewService.deleteReview(reviewId);

        return new CustomResponse(200, "리뷰 삭제 성공");
    }


}
