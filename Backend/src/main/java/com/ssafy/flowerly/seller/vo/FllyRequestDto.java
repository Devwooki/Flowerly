package com.ssafy.flowerly.seller.vo;



import com.ssafy.flowerly.member.vo.MemberDto;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class FllyRequestDto {

    private Long fllyId;
    private MemberDto consumer;
    private String imageUrl;
    private String situation;
    private String target;
    private String color1;
    private String color2;
    private String color3;

    private FlowerSimpleInfoDto flower1;
    private FlowerSimpleInfoDto flower2;
    private FlowerSimpleInfoDto flower3;

    private String orderType;
    private String requestContent;
    private String progress;
    private Integer budget;
    private LocalDateTime deadline;

}
