package com.ssafy.flowerly.seller.vo;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class FlowerSimpleInfoDto {

    private String flowerName;
    private List<FlowerMeaningDto> flowerMeaning;

}
