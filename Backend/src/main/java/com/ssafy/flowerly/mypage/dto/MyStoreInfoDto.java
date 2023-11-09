package com.ssafy.flowerly.mypage.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyStoreInfoDto {

    private Long storeId;

    private String storeName;
    private String sellerName;

    private String phoneNumber;

    private String storeNumber;

    private String address;


}
