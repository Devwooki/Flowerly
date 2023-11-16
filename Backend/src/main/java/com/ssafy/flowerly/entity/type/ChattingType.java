package com.ssafy.flowerly.entity.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ChattingType {
    NORMAL("정상"),
    CANCELED("플리가 취소됨"),
    ORDERED("주문 완료됨"),
    COMPLETED("플리가 완료됨");

    private final String title;
}
