package com.ssafy.flowerly.seller.vo;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FllyRequestSimpleDto {

    private Long fllyId;
    private String requestImgUrl;
    private String situation;
    private String target;
    private String color1;
    private String color2;
    private String color3;

    private FlowerSimpleInfoDto flower1;
    private FlowerSimpleInfoDto flower2;
    private FlowerSimpleInfoDto flower3;

}
