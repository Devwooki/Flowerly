package com.ssafy.flowerly.seller.buyer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class FlistResponseDto {
    Long fllyParticipationId;
    Long fllyid;
    FlistStoreInfo seller;
    String imageUrl;
    Integer offerPrice;
    String content;
}
