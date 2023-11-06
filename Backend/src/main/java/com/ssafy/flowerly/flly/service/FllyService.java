package com.ssafy.flowerly.flly.service;

import com.ssafy.flowerly.entity.Review;
import com.ssafy.flowerly.entity.StoreInfo;
import com.ssafy.flowerly.member.model.MemberService;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.member.vo.StoreInfoDto;
import com.ssafy.flowerly.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FllyService {
    private final StoreInfoRepository storeInfoRepository;
    private final ReviewRepository reviewRepository;
    private final MemberService memberService;

    public Map<String, Object> getStoreDetail(Pageable pageable, Long sellerId){
        Map<String, Object> responseData = new HashMap<>();

        responseData.put("store", memberService.getStoreInfo(sellerId) );
        responseData.put("review", reviewRepository.findReviewsBySeller_MemberIdAndIsRemovedFalse(pageable, sellerId).map(Review::toDetailDto));
        return responseData;
    }



}
