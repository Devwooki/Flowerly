package com.ssafy.flowerly.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class FllyDeliveryRegion {
    @Id
    @GeneratedValue
    private Long fllyDeliveryRegionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flly_id")
    private Flly flly;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sido_code")
    private Sido sido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sigungu_code")
    private Sigungu sigungu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dong_code")
    private Dong dong;

    @Lob
    private String deliveryAddress;
}
