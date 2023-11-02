package com.ssafy.flowerly.seller.vo;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class OrderSelectSimpleDto {

    private Long requestId;
    private String orderName;
    private String phoneNumber;
    private String orderType;
    private String deliveryPickupTime;
    private Long fllyId;
    private String progress;

}
