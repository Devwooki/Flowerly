package com.ssafy.flowerly.seller.vo;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestFllyParticipateDto {

    private Long fllyId;
    private String content;
    private Integer offerPrice;

}
