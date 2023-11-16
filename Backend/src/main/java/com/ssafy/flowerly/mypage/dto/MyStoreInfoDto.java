package com.ssafy.flowerly.mypage.dto;


import lombok.*;

import java.util.List;



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

    private String sidoName;

    private String sigunguName;

    private String dongName;

    private List<ImageInfoDto> images;


}
