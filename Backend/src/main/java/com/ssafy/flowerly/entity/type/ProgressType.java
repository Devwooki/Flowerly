package com.ssafy.flowerly.entity.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ProgressType {
    START("입찰"),
    DISCUSSION("조율"),
    FINISH_ORDER("주문완료"),
    FINISH_MAKING("제작완료"),
    FINISH_DELIVERY("픽업/배달완료");

    private final String title;
}
