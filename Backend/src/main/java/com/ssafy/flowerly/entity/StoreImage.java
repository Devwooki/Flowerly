package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.s3.vo.StoreImageResponse;
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
public class StoreImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeImageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member seller;

    @Column(nullable = false)
    private String imageUrl;

    public void updateImage(String newUrl){
        this.imageUrl = newUrl;
    }



    public StoreImageResponse toResponseDto(){
        return new StoreImageResponse(this.storeImageId, this.seller.getMemberId(),this.imageUrl);
    }
}
