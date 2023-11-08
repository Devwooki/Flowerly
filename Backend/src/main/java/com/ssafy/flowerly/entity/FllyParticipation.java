package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.entity.common.BaseCreatedTimeEntity;
import com.ssafy.flowerly.seller.buyer.dto.FllyParticipateResponseDto;
import com.ssafy.flowerly.seller.vo.FllyResponeDto;
import com.ssafy.flowerly.seller.vo.OrderParticipationDto;
import com.ssafy.flowerly.seller.vo.RequestFllyParticipateDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate //update시, 실제 값이 변경되는 컬럼만 update 쿼리로 생성
@Builder
@ToString
public class FllyParticipation extends BaseCreatedTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fllyParticipationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flly_id")
    private Flly flly;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member seller;  // 판매자

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private Integer offerPrice;

    private String content;


    public OrderParticipationDto toOrderParticipationDto(){

        FllyResponeDto fllyResponeDto = toFllyResponeDto();
        DateTimeFormatter Timeformatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return OrderParticipationDto.builder()
                .fllyId(this.flly.getFllyId())
                .fllyImageUrl(this.flly.getImageUrl())
                .fllyFlower1(this.flly.getFlower1() != null ? this.flly.getFlower1().getFlowerName() : null)
                .fllyFlower2(this.flly.getFlower2() != null ? this.flly.getFlower2().getFlowerName() : null)
                .fllyFlower3(this.flly.getFlower3() != null ? this.flly.getFlower3().getFlowerName() : null)
                .fllybudget(this.flly.getBudget())
                .fllyProgress(this.flly.getProgress().getTitle())
                .fllyDeadline(this.flly.getDeadline() != null ? this.flly.getDeadline().format(Timeformatter) : null)
                .fllyResponeDto(fllyResponeDto)
//                .fllyParticipationId(this.fllyParticipationId)
//                .requestImageUrl(this.imageUrl)
//                .requestPrice(this.offerPrice)
//                .content(this.content)
                .build();
    }

    public FllyResponeDto toFllyResponeDto(){
        return FllyResponeDto.builder()
                .fllyParticipationId(this.fllyParticipationId)
                .requestImageUrl(this.imageUrl)
                .requestPrice(this.offerPrice)
                .content(this.content)
                .build();
    }


    @Builder
    public FllyParticipation(String imageUrl, Integer offerPrice, String content, Member seller, Flly flly ){
        this.imageUrl = imageUrl;
        this.offerPrice = offerPrice;
        this.content = content;
        this.seller = seller;
        this.flly = flly;
    }

    public FllyParticipateResponseDto toResponseDto(){
        return FllyParticipateResponseDto.builder()
                .fllyParticipationId(this.fllyParticipationId)
                .offerPrice(this.offerPrice)
                .imageUrl(this.imageUrl)
                .content(this.content)
                .build();
    }
}
