package com.ssafy.flowerly.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    INVALID_ITEM(100, "아이템이 존재하지 않습니다."),
    INVALID_REFRESHTOKEN(9000, "RefreshToken을 찾을 수 없습니다.");
    private final int code;
    private final String message;
}
