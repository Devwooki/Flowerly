package com.ssafy.flowerly.member.vo;

import com.ssafy.flowerly.entity.Member;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class StoreInfoDto {
    private Long storeInfoId;
    private String storeName;  // 상호명
    private String storeNumber;
    private String sellerName;  // 사업자명
    private String phoneNumber;
    private String address;

    private MemberDto member;

    private List<String> images;
}
