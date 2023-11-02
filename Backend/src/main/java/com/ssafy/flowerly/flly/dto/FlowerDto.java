package com.ssafy.flowerly.flly.dto;

import com.ssafy.flowerly.entity.Flower;
import com.ssafy.flowerly.entity.type.ColorType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlowerDto {
    private Long flowerCode;
    private String flowerName;
    private String imageUrl;
    private ColorType color;
    private String engName;
    private String meaning;

    public static FlowerDto of(Flower flower) {
        return FlowerDto.builder()
                .flowerCode(flower.getFlowerCode())
                .flowerName(flower.getFlowerName())
                .imageUrl(flower.getImageUrl())
                .color(flower.getColor())
//                .engName(flower.get)
//                .meaning()
                .build();
    }
}
