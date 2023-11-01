package com.ssafy.flowerly.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    INVALID_ITEM(100, "아이템이 존재하지 않습니다."),

    NOT_FIND_MEMBER(-4000, "유저 정보를 찾을 수 없습니다"),
    NOT_FIND_FLLY(-4001, "플리 정보를 찾을 수 없습니다."),
    NOT_SELLER_DELIVERY_REGION(-4002, "배달 가능 지역을 설정해주세요"),
    MEMBER_NOT_SELLER(-4003, "해당 유저는 판매자가 아닙니다"),
    NOT_SELLER_SEARCH_NEAR(-4004, "주변에 가능한 플리가 없습니다."),

    SELLER_PARTICIPATE_FAIL(-5000, "플리 참여에 실패하였습니다"),
    SELLER_ALREADY_PARTICIPATE(-5001, "이미 참가하신 플리입니다"),

    CHATTING_NOT_FOUND(6001, "채팅 정보를 찾을 수 없습니다."),

    INVALID_UPLOAD_FILE(-8001, "업로드한 파일을 찾을 수 없습니다."),
    INVALID_UPLOAD_TYPE(-8002, "업로드 요청 타입을 찾을 수 없습니다."),
    INVALID_BASE64(-8003, "지원하지 않는 타입입니다."),

    INVALID_REFRESH_TOKEN(-9000, "RefreshToken을 찾을 수 없습니다."),
    INVALID_ACCESS_TOKEN(-9001, "AccessToken이 유효하지 않습니다.");

    private final int code;
    private final String message;
}
