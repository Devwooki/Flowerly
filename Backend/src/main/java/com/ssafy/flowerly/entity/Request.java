package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.entity.common.BaseCreatedTimeEntity;
import com.ssafy.flowerly.entity.type.OrderType;
import com.ssafy.flowerly.seller.vo.OrderSelectSimpleDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate //update시, 실제 값이 변경되는 컬럼만 update 쿼리로 생성
@Builder
@ToString
public class Request extends BaseCreatedTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flly_id")
    private Flly flly;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member seller;  // 판매자

    @Column(nullable = false)
    private String orderName;

    @Column(nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private OrderType orderType;

    @Column(nullable = false)
    private LocalDateTime deliveryPickupTime;

    @Column(nullable = false)
    private String requestContent;

    @Column(nullable = false)
    private Integer price;


    public OrderSelectSimpleDto toOrderSelectSimpleDto(){
        return OrderSelectSimpleDto.builder()
                .requestId(this.requestId)
                .fllyId(this.getFlly().getFllyId())
                .orderName(this.orderName)
                .phoneNumber(this.phoneNumber)
                .orderType(this.orderType.getTitle())
                .deliveryPickupTime(this.deliveryPickupTime)
                .progress(this.getFlly().getProgress().getTitle())
                .build();
    }

    public void setRequestPrice(Integer price) {
        this.price = price;
    }

}
