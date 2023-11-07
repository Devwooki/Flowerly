package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.seller.vo.FllyNearDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FllyPickupRegion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fllyPickupRegionId;

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


    public FllyNearDto toPickupFllyNearDto(){
        DateTimeFormatter Timeformatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return FllyNearDto.builder()
                .fllyId(this.flly.getFllyId())
                .flowerName1(this.flly.getFlower1().getFlowerName())
                .flowerName2(this.flly.getFlower2().getFlowerName())
                .flowerName3(this.flly.getFlower3().getFlowerName())
                .budget(this.flly.getBudget())
                .imageUrl(this.flly.getImageUrl())
                .progress(this.flly.getProgress().getTitle())
                .deadline(this.flly.getDeadline() != null ? this.flly.getDeadline().format(Timeformatter) : null)
                .build();
    }

}
