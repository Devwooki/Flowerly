package com.ssafy.flowerly.chatting.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestFromChattingDto {
    private String orderType;
    private String ordererName;
    private String phoneNumber;
    private String deliveryPickupTime;
    private String requestContent;

    private String recipientName;
    private String recipientPhoneNumber;
    private String address;
}
