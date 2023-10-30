package com.ssafy.flowerly.entity.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ColorType {
    RED("빨간색"),
    ORANGE("주황색"),
    YELLOW("노란색"),
    PINK("분홍색"),
    BLUE("파란색"),
    PURPLE("보라색"),
    WHITE("흰색");

    private final String title;
}
