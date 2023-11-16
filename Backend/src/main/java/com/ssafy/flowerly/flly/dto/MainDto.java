package com.ssafy.flowerly.flly.dto;

import com.ssafy.flowerly.entity.Flower;
import com.ssafy.flowerly.entity.type.ColorType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MainDto {
    private Long flowerCode;
    private String flowerName;
    private String imageUrl;
    private String meaning;
    private String period;

    public static MainDto of(Flower flower) {
        return MainDto.builder()
                .flowerCode(flower.getFlowerCode())
                .flowerName(flower.getFlowerName())
                .imageUrl(flower.getImageUrl())
                .meaning(flower.getMeaning())
                .period(flower.getFlowerPeriod())
                .build();
    }
}
