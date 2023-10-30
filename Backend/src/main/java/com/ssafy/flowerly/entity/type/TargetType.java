package com.ssafy.flowerly.entity.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TargetType {
    FRIEND("친구"),
    COUPLE("연인"),
    PARENTS("부모님"),
    FAMILY("가족"),
    TEACHER("선생님"),
    PEER("동료"),
    ME("나");

    private final String title;
}
