package com.ssafy.flowerly.chatting.dto;

import com.ssafy.flowerly.entity.Request;
import com.ssafy.flowerly.entity.RequestDeliveryInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestFromChattingDto {
    private String storeName;

    private String orderType;
    private String ordererName;
    private String phoneNumber;
    private String deliveryPickupTime;
    private String requestContent;

    private Long requestId;
    private Integer price;
    private Boolean isPaid;

    private String recipientName;
    private String recipientPhoneNumber;
    private String address;

    public void setRequestInfo(Request request, String storeName) {
        this.storeName = storeName;

        this.orderType = request.getOrderType().getTitle();
        this.ordererName = request.getOrderName();
        this.phoneNumber = request.getPhoneNumber();
        this.deliveryPickupTime = request.getDeliveryPickupTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
        this.requestContent = request.getRequestContent();

        this.requestId = request.getRequestId();
        this.price = request.getPrice();
        this.isPaid = request.getIsPaid();
    }

    public void setDeliveryInfo(RequestDeliveryInfo deliveryInfo) {
        this.recipientName = deliveryInfo.getRecipientName();
        this.recipientPhoneNumber = deliveryInfo.getPhoneNumber();
        this.address = deliveryInfo.getAddress();
    }
}

