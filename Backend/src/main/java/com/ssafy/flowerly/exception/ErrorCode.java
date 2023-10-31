package com.ssafy.flowerly.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    INVALID_ITEM(100, "아이템이 존재하지 않습니다."),

    INVALID_UPLOAD_FILE(8001, "업로드한 파일을 찾을 수 없습니다."),
    INVALID_UPLOAD_TYPE(8002, "업로드 요청 타입을 찾을 수 없습니다."),
    INVALID_BASE64(8003, "지원하지 않는 타입입니다."),
    INVALID_REFRESH_TOKEN(9000, "RefreshToken을 찾을 수 없습니다."),
    INVALID_ACCESS_TOKEN(9001, "AccessToken이 유효하지 않습니다.");


    private final int code;
    private final String message;
}
