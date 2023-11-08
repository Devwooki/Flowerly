package com.ssafy.flowerly.mypage.service;


import com.ssafy.flowerly.entity.*;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.mypage.dto.BuyerFllyDto;
import com.ssafy.flowerly.mypage.dto.SellerFllyDto;
import com.ssafy.flowerly.mypage.dto.StoreMyPageDto;
import com.ssafy.flowerly.review.repository.ReviewRepository;
import com.ssafy.flowerly.seller.model.FllyRepository;
import com.ssafy.flowerly.seller.model.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final MemberRepository memberRepository;
    private final StoreInfoRepository storeInfoRepository;
    private final RequestRepository requestRepository;
    private final FllyRepository fllyRepository;
    private final ReviewRepository reviewRepository;


    public Object getNickName(Long memberId) {

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));

        return member.getNickName();
    }

    public Object updateNickName(Long memberId, String newNickName) {

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));

        member.updateNickName(newNickName);
        memberRepository.save(member);

        return member.getNickName();

    }


    public Object updateNotification(Long memberId) {

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));

        String newNotificationStatus = member.notificationToggle();
        memberRepository.save(member);


        return newNotificationStatus;

    }

    @Transactional
    public StoreMyPageDto getStoreNameAndImg(Long memberId) {

        List<Object[]> results = storeInfoRepository.findBySellerInfo(memberId);

        if (results.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FIND_MEMBER);
        }


        StoreInfo storeInfo = (StoreInfo) results.get(0)[0];
        String storeName = storeInfo.getStoreName();


        List<String> imageUrls = results.stream()
                .filter(objects -> objects[1] != null)
                .map(objects -> ((StoreImage) objects[1]).getImageUrl())
                .collect(Collectors.toList());

        return StoreMyPageDto.builder()
                .storeName(storeName)
                .imageUrl(imageUrls)
                .build();
    }


    public List<SellerFllyDto> getSellerFlly(Long memberId) {
        List<Request> requests = requestRepository.findBySellerMemberId(memberId);
        return requests.stream()
                .map(request -> new SellerFllyDto(
                        request.getFlly().getFllyId(),
                        request.getOrderName(),
                        request.getOrderType().getTitle(),
                        request.getDeliveryPickupTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                        request.getFlly().getProgress().getTitle()))
                .collect(Collectors.toList());
    }


    public List<BuyerFllyDto> getBuyerFlly(Long memberId) {
        List<Flly> fllyList = fllyRepository.findByConsumerMemberId(memberId);


        return fllyList.stream().map(flly -> {
            Optional<Request> paidRequestOpt = requestRepository.findByFllyFllyIdAndIsPaid(flly.getFllyId(), true);

            String storeName = null;
            String requestOrderType = null;
            String deliveryPickupTime = null;
            Boolean isReviewed = false;


            if (paidRequestOpt.isPresent()) {
                Request paidRequest = paidRequestOpt.get();
                storeName = paidRequest.getSeller().getNickName();
                requestOrderType = paidRequest.getOrderType().getTitle();
                deliveryPickupTime = paidRequest.getDeliveryPickupTime().toString();
                isReviewed = reviewRepository.existsByRequestRequestId(paidRequest.getRequestId());
            }


            return BuyerFllyDto.builder()
                    .fllyId(flly.getFllyId())
                    .buyerNickName(flly.getConsumer().getNickName())
                    .storeName(storeName)
                    .fllyOrderType(flly.getOrderType().getTitle())
                    .progress(flly.getProgress().getTitle())
                    .requestOrderType(requestOrderType)
                    .deliveryPickupTime(deliveryPickupTime)
                    .isReviewed(isReviewed)
                    .build();
        }).collect(Collectors.toList());

    }

}
