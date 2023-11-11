package com.ssafy.flowerly.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberRole {
    //Security에서 권한코드에 항상 ROLE_ 접두사가 붙기 떄문
    GUEST("ROLE_GUEST", "게스트"),
    USER("ROLE_USER", "구매자"),
    DELETE(" ", "삭제된유저"),
    SELLER("ROLE_SELLER", "판매자");

    private final String key;
    private final String title;
}
