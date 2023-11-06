package com.ssafy.flowerly.seller.vo;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FllyOrderInfoDto {

    private Long requestId;
    private String orderName;
    private String phoneNumber;
    private String orderType;
    private String deliveryPickupTime;
    private Long fllyId;
    private String progress;
    private String responseImgUrl;
    private String responseContent;
    private Integer price;
    private String createTime;

}
