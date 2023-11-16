package com.ssafy.flowerly.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellerFllyDto {

    private Long fllyId;
    private String orderName;
    private String orderType;
    private String deliveryPickupTime;
    private String progress;
    private String imageUrl;
    private String createdAt;

}
