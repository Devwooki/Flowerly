package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.seller.vo.AddressSimpleDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate //update시, 실제 값이 변경되는 컬럼만 update 쿼리로 생성
@Builder
@ToString
public class StoreDeliveryRegion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeDeliveryRegionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sido_code")
    private Sido sido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sigungu_code")
    private Sigungu sigungu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dong_code")
    private Dong dong;


    public AddressSimpleDto toAddressSimpleDto() {
        return AddressSimpleDto.builder()
                .sidoCode(this.sido.getSidoCode())
                .sidoName(this.sido.getSidoName())
                .sigunCode(this.sigungu.getSigunguCode())
                .sigunName(this.sigungu.getSigunguName())
                .dongCode(this.dong.getDongCode())
                .dongName(this.dong.getDongName())
                .build();
    }
}
