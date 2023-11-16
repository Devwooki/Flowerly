package com.ssafy.flowerly.FCM.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FCMNotificationRequestDto {
    private Long targetMemberId;
    private String title;
    private String body;
}
