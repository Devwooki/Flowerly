package com.ssafy.flowerly.mypage.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageInfoDto {
    private Long storeImageId;
    private String imageUrl;
}
