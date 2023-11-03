package com.ssafy.flowerly.seller.vo;


import com.ssafy.flowerly.entity.Request;
import lombok.*;

import java.time.format.DateTimeFormatter;

@Data
@Getter
public class OrderRequestDto {
    Request request;
    String imageUrl;


    public OrderRequestDto(Request request, String imageUrl){
        this.request = request;
        this.imageUrl =imageUrl;
    }

    public OrderSelectSimpleDto toOrderSelectSimpleDto(){
        DateTimeFormatter Timeformatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return OrderSelectSimpleDto.builder()
                .requestId(this.request.getRequestId())
                .fllyId(this.request.getFlly().getFllyId())
                .orderName(this.request.getOrderName())
                .phoneNumber(this.request.getPhoneNumber())
                .orderType(this.request.getOrderType().getTitle())
                .deliveryPickupTime(this.request.getDeliveryPickupTime() != null ? this.request.getDeliveryPickupTime().format(Timeformatter) : null)
                .progress(this.request.getFlly().getProgress().getTitle())
                .imageUrl(this.imageUrl)
                .build();
    }
}
