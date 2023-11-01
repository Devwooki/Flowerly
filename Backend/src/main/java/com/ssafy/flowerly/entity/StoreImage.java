package com.ssafy.flowerly.entity;

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
}
