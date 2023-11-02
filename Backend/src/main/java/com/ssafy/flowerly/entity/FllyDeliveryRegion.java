package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.seller.vo.FllyNearDto;
import lombok.Getter;

import javax.persistence.*;
import java.time.format.DateTimeFormatter;

@Getter
@Entity
public class FllyDeliveryRegion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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


    public FllyNearDto toDeliveryFllyNearDto(){
        DateTimeFormatter Timeformatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return FllyNearDto.builder()
                .fllyId(this.flly.getFllyId())
                .flowerName1(this.flly.getFlower1().getFlowerName())
                .flowerName2(this.flly.getFlower2().getFlowerName())
                .flowerName3(this.flly.getFlower3().getFlowerName())
                .budget(this.flly.getBudget())
                .deadline(this.flly.getDeadline() != null ? this.flly.getDeadline().format(Timeformatter) : null)
                .progress(this.flly.getProgress().getTitle())
                .imageUrl(this.flly.getImageUrl())
                .build();
    }
}
