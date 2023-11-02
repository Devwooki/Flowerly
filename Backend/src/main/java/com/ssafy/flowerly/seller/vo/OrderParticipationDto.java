package com.ssafy.flowerly.seller.vo;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class OrderParticipationDto {
    //플리 정보 (요청)
    private Long fllyId;
    private String fllyImageUrl;
    private String fllyFlower1;
    private String fllyFlower2;
    private String fllyFlower3;
    private Integer fllybudget;
    private String fllyDeadline;
    //응답 정보
    FllyResponeDto fllyResponeDto;
//    private Long fllyParticipationId;
//    private String requestImageUrl;
//    private Integer requestPrice;
//    private String content;

}
