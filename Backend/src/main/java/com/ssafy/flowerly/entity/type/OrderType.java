package com.ssafy.flowerly.entity.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OrderType {
    DELIVERY("배달"),
    PICKUP("픽업");

    private final String title;
}
