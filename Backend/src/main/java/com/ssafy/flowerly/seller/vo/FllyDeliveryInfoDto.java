package com.ssafy.flowerly.seller.vo;


import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FllyDeliveryInfoDto {
    String address;
    String phoneNumber;
    String recipientName;
}
