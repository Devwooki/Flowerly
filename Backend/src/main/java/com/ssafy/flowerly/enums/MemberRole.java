package com.ssafy.flowerly.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberRole {

    USER("user", "구매자"),
    DELETE("delete", "삭제된유저"),
    SELLER("seller", "판매자");

    private final String key;
    private final String title;
}
