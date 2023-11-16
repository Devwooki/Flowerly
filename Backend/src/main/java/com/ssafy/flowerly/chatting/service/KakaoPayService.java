package com.ssafy.flowerly.chatting.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.flowerly.FCM.service.FCMService;
import com.ssafy.flowerly.chatting.dto.PaymentDto;
import com.ssafy.flowerly.chatting.dto.StompChatRequest;
import com.ssafy.flowerly.chatting.repository.ChattingRepository;
import com.ssafy.flowerly.chatting.repository.PaymentRepository;
import com.ssafy.flowerly.entity.*;
import com.ssafy.flowerly.entity.type.ChattingType;
import com.ssafy.flowerly.entity.type.ProgressType;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.seller.model.RequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class KakaoPayService {

    private final ChattingService chattingService;
    private final FCMService fcmService;
    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;
    private final RequestRepository requestRepository;
    private final ChattingRepository chattingRepository;

    private static final ObjectMapper mapper = new ObjectMapper();

    @Value("${payment.kakaopay.cid}")
    private String cid;

    @Value("${payment.kakaopay.admin.key}")
    private String adminKey;

//    @Value("${payment.kakaopay.url.ready}")
//    private String readyUrl;
//    @Value("${payment.kakaopay.url.approve}")
//    private String approveUrl;

    @Value("${payment.kakaopay.redirectUrl.approvalRedirectUrl}")
    private String approvalRedirectUrl;
    @Value("${payment.kakaopay.redirectUrl.cancelRedirectUrl}")
    private String cancelRedirectUrl;
    @Value("${payment.kakaopay.redirectUrl.failRedirectUrl}")
    private String failRedirectUrl;

    @Transactional
    public PaymentDto.ReadyResponse ready(PaymentDto.PayReq payReq, Long memberId) {
        if(requestRepository.findSameFllyRequest(payReq.getRequestId()).size() > 0) {
            throw new CustomException(ErrorCode.REQUEST_ALREADY_DONE);
        }
        if(requestRepository.findByRequestId(payReq.getRequestId()).get().getIsPaid()) {
            throw new CustomException(ErrorCode.REQUEST_ALREADY_PAID);
        }

        // 카카오페이 api 호출
        PaymentDto.KakaoReadyResponse kakaoReadyResponse = kakaoReady(payReq);

        // 결제정보 저장
        Payment payment = Payment.builder()
                .member(memberRepository.getReferenceById(memberId))
                .request(requestRepository.getReferenceById(payReq.getRequestId()))
                .price(payReq.getPrice())
                .cid(this.cid)
                .tid(kakaoReadyResponse.getTid())
                .createdAt(LocalDateTime.parse(kakaoReadyResponse.getCreated_at()))
                .build();
        payment = paymentRepository.save(payment);

//        System.out.println(kakaoReady.getCreated_at());
        return PaymentDto.ReadyResponse.builder()
                .paymentId(payment.getPaymentId())
                .nextRedirectMobileUrl(kakaoReadyResponse.getNext_redirect_mobile_url())
                .nextRedirectPcUrl(kakaoReadyResponse.getNext_redirect_pc_url())
                .build();
    }

    public PaymentDto.KakaoReadyResponse kakaoReady(PaymentDto.PayReq payReq) {
        // 카카오페이 Ready API 요청 본문
        MultiValueMap<String, String> jsonBody = new LinkedMultiValueMap<>();
        jsonBody.add("cid", this.cid);
        jsonBody.add("partner_order_id", payReq.getRequestId().toString());
        jsonBody.add("partner_user_id", payReq.getSellerId().toString());
        jsonBody.add("item_name", "꽃다발");
        jsonBody.add("quantity", "1");
        jsonBody.add("total_amount", payReq.getPrice().toString());
        jsonBody.add("tax_free_amount", "0");
        jsonBody.add("approval_url", payReq.getDomain() + approvalRedirectUrl);
        jsonBody.add("cancel_url", payReq.getDomain() + cancelRedirectUrl);
        jsonBody.add("fail_url", payReq.getDomain() + failRedirectUrl);

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(jsonBody, this.getHeaders());

        return restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntity,
                PaymentDto.KakaoReadyResponse.class
        );
    }

    @Transactional
    public void approve(Long memberId, PaymentDto.ApproveReq approveReq) {
        Payment payment = paymentRepository.findById(approveReq.getPaymentId())
                .orElseThrow(() -> new CustomException(ErrorCode.PAYMENT_NOT_FOUND));
        Request request = payment.getRequest();
        PaymentDto.KakaoApproveResponse kakaoApproveResponse = kakaoApprove(
                payment.getTid(),
                request.getRequestId().toString(),
                request.getSeller().getMemberId().toString(),
                approveReq.getPgToken()
        );

        // 결제 정보 업데이트
        payment.addApprovalInfo(kakaoApproveResponse.getAid(), approveReq.getPgToken(), kakaoApproveResponse.getApproved_at());
        // 주문 결제 완료 여부 업데이트
        request.complete();
        // 플리 진행 상태 변경
        request.getFlly().setProgress(ProgressType.FINISH_ORDER);
        // 채팅방 상태 변경
        Chatting chatting = chattingRepository.findById(approveReq.getChattingId())
                .orElseThrow(() -> new CustomException(ErrorCode.CHATTING_NOT_FOUND));
        chatting.updateStatus(ChattingType.ORDERED);
        // 결제 완료 메세지 전송
        chattingService.saveChattingMessage(
                new StompChatRequest(approveReq.getChattingId(), memberId, "PAYMENT_COMPLETE", "결제가 완료되었습니다.")
        );

        // 알림 전송
        Member seller = memberRepository.findByMemberId(request.getSeller().getMemberId())
                        .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        try {
            fcmService.sendPushMessage(seller.getMemberId(), "구매자가 결제를 완료했습니다.", "꽃다발 제작을 준비해 주세요!");
        } catch (Exception e) {
            log.info("주문 완료 중 알림 전송 오류 발생");
        }
    }

    public PaymentDto.KakaoApproveResponse kakaoApprove(String tid, String requestId, String sellerId, String pgToken) {
        // 카카오페이 Ready API 요청 본문
        MultiValueMap<String, String> jsonBody = new LinkedMultiValueMap<>();
        jsonBody.add("cid", this.cid);
        jsonBody.add("tid", tid);
        jsonBody.add("partner_order_id", requestId);
        jsonBody.add("partner_user_id", sellerId);
        jsonBody.add("pg_token", pgToken);

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(jsonBody, this.getHeaders());

        try {
            PaymentDto.KakaoApproveResponse approveResponse = restTemplate.postForObject(
                    "https://kapi.kakao.com/v1/payment/approve",
                    requestEntity,
                    PaymentDto.KakaoApproveResponse.class
            );

            return approveResponse;
        } catch (HttpClientErrorException e) {
            JSONObject errorMsg = new JSONObject(e.getResponseBodyAsString());
            Integer code = errorMsg.getInt("code");
            String msg = errorMsg.getString("msg");
            System.out.println(msg);  // -702는 이미 결제됨
            throw new CustomException(ErrorCode.KAKAO_PAY_APPROVAL_FAIL);
        }
    }

    public PaymentDto.KakaoCancelResponse kakaoCancel(String tid, Integer cancelAmout, Integer cancelTaxFreeAmount) {
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", this.cid);
        parameters.add("tid", tid);
        parameters.add("cancel_amount", cancelAmout.toString());
        parameters.add("cancel_tax_free_amount", cancelTaxFreeAmount.toString());

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        PaymentDto.KakaoCancelResponse cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                PaymentDto.KakaoCancelResponse.class
        );

        return cancelResponse;
    }

    private HttpHeaders getHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.set("Authorization", "KakaoAK " + this.adminKey);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }
}
