package com.ssafy.flowerly.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    INVALID_ITEM(100, "아이템이 존재하지 않습니다."),
    //Auth 관련
    UNAUTHORIZED(401, "액세스 토큰이 존재하나 유효하지 않습니다."),
    FORBIDDEN(403, "로그인 정보가 없거나 만료되어 재로그인이 필요합니다."),
    NOT_AVAILABLE(404, "데이터가 접근불가능하거나 삭제가 되었습니다."),
    INVALID_ACCESS(403, "비정상적인 접근입니다."),

    NOT_FIND_MEMBER(-4000, "유저 정보를 찾을 수 없습니다"),
    NOT_FIND_FLLY(-4001, "플리 정보를 찾을 수 없습니다."),
    NOT_SELLER_DELIVERY_REGION(-4002, "배달 가능 지역을 설정해주세요"),
    MEMBER_NOT_SELLER(-4003, "해당 유저는 판매자가 아닙니다"),
    NOT_SELLER_SEARCH_NEAR(-4004, "주변에 가능한 플리가 없습니다."),
    NOT_FIND_FLLY_DELIVERYREGION(-4005, "해당 플리의 배달 정보를 찾을수 없습니다"),
    NOT_FIND_ORDERLIST(-4006, "채택된 주문을 찾을수 없습니다"),
    NOT_FIND_FLLY_PARTICIPATE(-4007, "참가하신 플리목록을 찾을수 없습니다"),

    NOT_FIND_SIDO(-4008, "시도 정보를 찾을 수 없습니다"),
    NOT_FIND_SIGUNGU(-4009, "시군구 정보를 찾을 수 없습니다."),
    NOT_FIND_DONG(-4010, "동 정보를 찾을 수 없습니다."),

    SELLER_PARTICIPATE_FAIL(-5000, "플리 참여에 실패하였습니다"),
    SELLER_ALREADY_PARTICIPATE(-5001, "이미 참가하신 플리입니다"),
    SELLER_NOT_PARTICIPATE(-5003, "플리에 참가하지 않은 유저입니다"),
    SELLER_NOT_REQUEST(-5004, "해당 주문서의 발급 유저가 아닙니다"),

    CHATTING_NOT_FOUND(-6001, "채팅 정보를 찾을 수 없습니다."),
    REQUEST_NOT_FOUND(-6002, "주문 정보를 찾을 수 없습니다."),
    REQUEST_DELIVERY_NOT_FOUND(-6003, "주문 배달 정보를 찾을 수 없습니다."),
    REQUEST_ALREADY_PAID(-604, "결제 금액이 존재하는 주문은 수정할 수 없습니다."),

    INVALID_UPLOAD_FILE(-8001, "업로드한 파일을 찾을 수 없습니다."),
    INVALID_UPLOAD_TYPE(-8002, "업로드 요청 타입을 찾을 수 없습니다."),
    INVALID_BASE64(-8003, "지원하지 않는 타입입니다."),
    INVALID_ADDRESS_FORMAT(-8004,"유효하지 않은 주소 형식입니다."),

    INVALID_REFRESH_TOKEN(-9000, "RefreshToken을 찾을 수 없습니다."),
    INVALID_ACCESS_TOKEN(-9001, "AccessToken이 유효하지 않습니다.");

    private final int code;
    private final String message;
}
