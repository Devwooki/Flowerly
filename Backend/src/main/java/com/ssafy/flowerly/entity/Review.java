package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.entity.common.BaseTimeEntity;
import com.ssafy.flowerly.review.dtos.ReviewDetailDto;
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
public class Review extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id")
    private Request request;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id")
    private Member consumer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private Member seller;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Boolean isRemoved;

    public ReviewDetailDto toDetailDto(){
        return ReviewDetailDto.builder()
                .writer(this.consumer.getNickName())
                .content(this.content)
                .writetime(this.getCreatedAt())
                .build();
    }
}
