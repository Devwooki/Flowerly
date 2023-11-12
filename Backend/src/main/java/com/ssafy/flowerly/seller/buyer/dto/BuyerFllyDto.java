package com.ssafy.flowerly.seller.buyer.dto;



import com.ssafy.flowerly.seller.vo.FlowerSimpleInfoDto;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class BuyerFllyDto {

    private Long fllyId;
    private String consumer;
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
    private String deadline;
    private String requestAddress;

    private String storeName;
}
