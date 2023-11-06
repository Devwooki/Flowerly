package com.ssafy.flowerly.review.controller;

import com.ssafy.flowerly.review.service.ReviewService;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    @GetMapping("/store-review/{sellerId}")
    public DataResponse<?> getReview(HttpServletRequest request,
                                     Pageable pageable,
                                     @PathVariable Long sellerId){
        return new DataResponse<>(HttpStatus.SC_OK, "리뷰를 반환합니다. page : " + pageable.getOffset(),  reviewService.getReviewBysellerId(pageable, sellerId));
    }



}
