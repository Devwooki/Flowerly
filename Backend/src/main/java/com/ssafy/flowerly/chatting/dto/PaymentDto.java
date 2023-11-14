package com.ssafy.flowerly.chatting.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

public class PaymentDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Info {
        private Long requestId;
        private Long sellerId;
        private String sellerName;
        private Integer price;
        private Boolean isPaid;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PayReq {
        private String domain;
        private Long requestId;
        private Long sellerId;
        private Integer price;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadyRequest {
        private String cid;
        private String partnerOrderId;
        private String partnerUserid;
        private String itemName;
        private Integer quantity;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ReadyResponse {
        private Long paymentId;
        private String nextRedirectMobileUrl;
        private String nextRedirectPcUrl;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class KakaoReadyResponse {
        private String tid;
        private String next_redirect_mobile_url;
        private String next_redirect_pc_url;
        private String created_at;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ApproveReq {
        private Long chattingId;
        private Long paymentId;
        private String pgToken;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class KakaoApproveResponse {
        private String aid;
        private String payment_method_type;
        private String approved_at;
        private Map<String, String> amount;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class KakaoCancelResponse {
        private String aid;
        private String status;
        private String canceled_at;
    }

}
