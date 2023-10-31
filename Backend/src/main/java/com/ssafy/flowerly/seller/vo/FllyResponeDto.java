package com.ssafy.flowerly.seller.vo;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@Builder
public class FllyResponeDto {
    
    //응답 정보
    private Long fllyParticipationId;
    private String requestImageUrl;
    private Integer requestPrice;
    private String content;

}
