package com.ssafy.flowerly.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuyerFllyDto {

    private Long fllyId;
    private String buyerNickName;
    private String storeName;
    private String fllyOrderType;
    private String progress;
    private String requestOrderType;
    private String deliveryPickupTime;
    private Boolean isReviewed;
    private String imageUrls;

    private String createdAt;


}
