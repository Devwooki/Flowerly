package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.seller.vo.FlowerMeaningDto;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class FlowerMeaning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flowerMeaningCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flower_code")
    private Flower flower;

    private String meaning;


    public FlowerMeaningDto toFlowerMeaningDto(){
        return FlowerMeaningDto.builder()
                .flowerMeaningCode(this.flowerMeaningCode)
                .meaning(this.meaning)
                .build();
    }
}
