package com.ssafy.flowerly.seller.vo;


import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FllyNearDto {

    private Long fllyId;
    private String flowerName1;
    private String flowerName2;
    private String flowerName3;
    private String imageUrl;
    private Integer budget;
    private LocalDateTime deadline;
    private String progress;
}
