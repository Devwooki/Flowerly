package com.ssafy.flowerly.seller.buyer.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class FlistStoreInfo {
    private Long storeInfoId;
    private String storeName;
    private String sellerName;
    private String phoneNumber;
    private String address;
}
