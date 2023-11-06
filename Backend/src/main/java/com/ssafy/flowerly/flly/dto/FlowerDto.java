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
    private String colorName;

    @Override
    public boolean equals(Object o) {
        return this.flowerCode == ((Flower)o).getFlowerCode();
    }

    public static FlowerDto of(Flower flower) {
        return FlowerDto.builder()
                .flowerCode(flower.getFlowerCode())
                .flowerName(flower.getScientificName())
                .imageUrl(flower.getImageUrl())
                .color(flower.getColor())
                .engName(flower.getEngName())
                .meaning(flower.getMeaning())
                .colorName(flower.getFlowerName())
                .build();
    }
}
