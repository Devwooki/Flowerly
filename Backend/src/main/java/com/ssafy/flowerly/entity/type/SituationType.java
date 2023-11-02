package com.ssafy.flowerly.entity.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SituationType {
    CONGRATS("축하"),
    CHEER("응원"),
    HEALTH("건강"),
    LOVE("사랑"),
    THANKS("감사"),
    APOLOGY("사과"),
    COMFORT("위로");

    private final String title;
}
