package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.entity.common.BaseCreatedTimeEntity;
import com.ssafy.flowerly.entity.type.*;
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
public class Flly extends BaseCreatedTimeEntity {
    @Id
    @GeneratedValue
    private Long fllyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member consumer;

    @Column(nullable = false)
    private boolean isCanceled;

    @Column(nullable = false)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private SituationType situation;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private TargetType target;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private ColorType color1;
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private ColorType color2;
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private ColorType color3;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flower_code_1")
    private Flower flower1;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flower_code_2")
    private Flower flower2;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flower_code_3")
    private Flower flower3;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private OrderType orderType;

    private String deliveryAddress;  // 배달인 경우에만 존재

    private String requestContent;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ProgressType progress;

    @Column(nullable = false)
    private Integer budget;

    @Column(nullable = false)
    private LocalDateTime deadline;
}
