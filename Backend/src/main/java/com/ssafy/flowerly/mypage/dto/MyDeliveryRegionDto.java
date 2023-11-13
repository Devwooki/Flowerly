package com.ssafy.flowerly.mypage.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyDeliveryRegionDto {

    private Long storeDeliveryRegionId;
    private Long sidoCode;
    private Long sigunguCode;
    private Long dongCode;
    private String fullAddress;
}
