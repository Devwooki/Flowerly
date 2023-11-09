package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.member.vo.StoreInfoDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate //update시, 실제 값이 변경되는 컬럼만 update 쿼리로 생성
@Builder
@ToString
public class StoreInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeInfoId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member seller;

    @Column(nullable = false)
    private String storeName;  // 상호명

    @Column(nullable = false)
    private String storeNumber;

    @Column(nullable = false)
    private String sellerName;  // 사업자명

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sido_code")
    private Sido sido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sigungu_code")
    private Sigungu sigungu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dong_code")
    private Dong dong;

    public StoreInfoDto toDto(){
        return StoreInfoDto.builder()
                .storeInfoId(this.seller.getMemberId())
                .storeName(this.storeName)
                .sellerName(this.sellerName)
                .phoneNumber(this.phoneNumber)
                .address(this.address)
                .build();
    }


    public void updateStoreName(String storeName) {this.storeName = storeName;}

    public void updateStoreNumber(String storeNumber) {this.storeNumber = storeNumber;}

    public void updateSellerName(String sellerName) {this.sellerName = sellerName;}

    public void updatePhoneNumber(String phoneNumber) {this.phoneNumber = phoneNumber;}

    public void updateAddress(String address) {this.address = address;}





}
