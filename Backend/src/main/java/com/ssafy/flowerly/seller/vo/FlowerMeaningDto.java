package com.ssafy.flowerly.seller.vo;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@Builder
public class FlowerMeaningDto {

    private Long flowerMeaningCode;
    private String meaning;
}
