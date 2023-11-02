package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.entity.type.ColorType;
import com.ssafy.flowerly.seller.vo.FlowerSimpleInfoDto;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@ToString
public class Flower {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flowerCode;

    private String flowerName;
    private String engName;
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private ColorType color;
    private String imageUrl;
    private String flowerPeriod;  // 메인 화면에서 보여줄 시기
    private String meaning;

    private Boolean january;
    private Boolean february;
    private Boolean march;
    private Boolean april;
    private Boolean may;
    private Boolean june;
    private Boolean july;
    private Boolean august;
    private Boolean september;
    private Boolean october;
    private Boolean november;
    private Boolean december;

}
