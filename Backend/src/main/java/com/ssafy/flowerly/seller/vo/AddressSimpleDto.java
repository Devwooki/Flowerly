package com.ssafy.flowerly.seller.vo;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddressSimpleDto {

    private Long sidoCode;
    private String sidoName;
    private Long sigunCode;
    private String sigunName;
    private Long dongCode;
    private String dongName;


}
