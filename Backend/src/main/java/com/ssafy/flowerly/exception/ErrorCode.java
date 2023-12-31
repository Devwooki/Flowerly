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

    INIT_FCM_ERROR(-3000, "FCM 설정 중 에러가 발생했습니다."),

    MEMBER_NOT_FOUND(-4000, "유저 정보를 찾을 수 없습니다"),

    FLLY_NOT_FOUND(-4001, "플리 정보를 찾을 수 없습니다."),
    NOT_SELLER_DELIVERY_REGION(-4002, "배달 가능 지역을 설정해주세요"),
    MEMBER_NOT_SELLER(-4003, "해당 유저는 판매자가 아닙니다"),
    NOT_SELLER_SEARCH_NEAR(-4004, "주변에 가능한 플리가 없습니다."),
    FLLY_DELIVERYREGION_NOT_FOUND(-4005, "해당 플리의 배달 정보를 찾을수 없습니다"),
    ORDERLIST_NOT_FOUND(-4006, "채택된 주문을 찾을수 없습니다"),
    FLLY_PARTICIPATION_NOT_FOUND(-4007, "참가하신 플리목록을 찾을수 없습니다"),


    SIDO_NOT_FOUND(-4008, "시도 정보를 찾을 수 없습니다"),
    SIGUNGU_NOT_FOUND(-4009, "시군구 정보를 찾을 수 없습니다."),
    DONG_NOT_FOUND(-4010, "동 정보를 찾을 수 없습니다."),
    STOREINFO_NOT_FOUND(-4011, "가게 정보를 찾을 수 없습니다."),
    REVIEW_NOT_FOUND(-4012, "리뷰 정보를 찾을 수 없습니다"),
    CONSUMER_NOT_REVIEWER(-4013, "리뷰 작성자가 아닙니다"),
    REQUEST_ADDRESS_NOT_FOUND(-4014, "플리의 배달 주소를 찾을 수 없습니다."),
    DUPLICATE_REQUEST_PAID(-4015, "중복 결제된 플리가 있습니다. 고객센터로 문의주세요"),
    REVIEW_ALREADY_EXISTS(-4016, "이미 리뷰가 작성되었습니다."),
    NOT_CREATED_FLLY_MEMBER(-4017, "나의 플리가 아닙니다."),

    SELLER_PARTICIPATE_FAIL(-5000, "플리 참여에 실패하였습니다"),
    SELLER_ALREADY_PARTICIPATE(-5001, "이미 참가하신 플리입니다"),
    SELLER_NOT_PARTICIPATE(-5003, "플리에 참가하지 않은 유저입니다"),
    SELLER_NOT_REQUEST(-5004, "해당 주문서의 발급 유저가 아닙니다"),


    CHATTING_NOT_FOUND(-6001, "채팅 정보를 찾을 수 없습니다."),
    REQUEST_NOT_FOUND(-6002, "주문 정보를 찾을 수 없습니다."),
    REQUEST_DELIVERY_NOT_FOUND(-6003, "주문 배달 정보를 찾을 수 없습니다."),
    REQUEST_PRICE_EXIST(-604, "결제 금액이 존재하는 주문은 수정할 수 없습니다."),
    REQUEST_ALREADY_PAID(-605, "이미 결제가 완료된 주문입니다."),
    KAKAO_PAY_APPROVAL_FAIL(-606, "카카오 페이 승인이 실패하였습니다."),
    PAYMENT_NOT_FOUND(-607, "결제 정보를 찾을 수 없습니다."),
    REQUEST_ALREADY_DONE(-608, "이미 주문 완료된 건이 있습니다."),
    CHATTING_OPPONENT_NOT_EXIST(-609, "채팅 상대를 찾을 수 없습니다."),

    INVALID_UPLOAD_FILE(-8001, "업로드한 파일을 찾을 수 없습니다."),
    INVALID_UPLOAD_TYPE(-8002, "업로드 요청 타입을 찾을 수 없습니다."),
    INVALID_BASE64(-8003, "지원하지 않는 타입입니다."),
    INVALID_ADDRESS_FORMAT(-8004,"유효하지 않은 주소 형식입니다."),
    INVALID_IMAGE_URL(-8005, "이미지 URL이 유효하지 않습니다."),
    IOException(-8006, "이미지 URL Encoding중 에러가 발생했습니다."),
    INVALID_UPLOAD_FILE_CNT(-8007, "대표사진은 최대 3개까지 업로드 가능합니다."),

    INVALID_REFRESH_TOKEN(-9000, "RefreshToken을 찾을 수 없습니다."),
    INVALID_ACCESS_TOKEN(-9001, "AccessToken이 유효하지 않습니다."),

    FLOWER_NOT_FOUND(-5100, "해당 꽃을 찾을 수 없습니다.");


    private final int code;
    private final String message;
}
