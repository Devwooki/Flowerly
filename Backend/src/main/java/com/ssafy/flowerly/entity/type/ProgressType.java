package com.ssafy.flowerly.entity.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ProgressType {
    START("입찰"),
    DISCUSSION("조율"),
    FINISH_ORDER("주문완료"),         //제작중  (완료 버튼)
    FINISH_MAKING("제작완료"),        //제작완료 배달중/픽업중 (완료버튼)
    FINISH_DELIVERY("픽업/배달완료"),
    CANCELED("플리취소");

    private final String title;
}
