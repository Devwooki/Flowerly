package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.entity.type.SituationType;
import com.ssafy.flowerly.entity.type.TargetType;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class FlowerRecommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flowerRecommendationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flower_code")
    private Flower flower;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private SituationType situation;
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private TargetType target;
}
