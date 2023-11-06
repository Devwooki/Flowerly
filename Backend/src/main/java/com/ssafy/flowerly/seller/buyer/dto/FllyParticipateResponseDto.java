package com.ssafy.flowerly.seller.buyer.dto;

import lombok.*;

import javax.persistence.Column;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FllyParticipateResponseDto {
    private Long fllyParticipationId;
    private String imageUrl;
    private Integer offerPrice;
    private String content;
}
