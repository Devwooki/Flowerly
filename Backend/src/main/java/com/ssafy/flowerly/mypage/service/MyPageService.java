package com.ssafy.flowerly.mypage.service;


import com.ssafy.flowerly.entity.*;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.mypage.dto.*;
import com.ssafy.flowerly.review.repository.ReviewRepository;
import com.ssafy.flowerly.seller.model.FllyRepository;
import com.ssafy.flowerly.seller.model.RequestRepository;
import com.ssafy.flowerly.seller.model.StoreDeliveryRegionRepository;
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
    private final StoreDeliveryRegionRepository storeDeliveryRegionRepository;


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

    public MyStoreInfoDto getMyStoreInfo(Long memberId) {

    StoreInfo storeInfo = storeInfoRepository.findBySellerMemberId(memberId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_STOREINFO));

    return MyStoreInfoDto.builder()
            .storeId(storeInfo.getStoreInfoId())
            .storeName(storeInfo.getStoreName())
            .sellerName(storeInfo.getSellerName())
            .phoneNumber(storeInfo.getPhoneNumber())
            .storeNumber(storeInfo.getStoreNumber())
            .address(storeInfo.getAddress())
            .build();
    }
    @Transactional
    public MyStoreInfoDto updateMyStoreInfo(Long memberId, MyStoreInfoDto myStoreInfoDto) {
        StoreInfo storeInfo = storeInfoRepository.findBySellerMemberId(memberId)
                .orElseThrow(()-> new CustomException(ErrorCode.NOT_FIND_STOREINFO));

        storeInfo.updateStoreName(myStoreInfoDto.getStoreName());
        storeInfo.updateStoreNumber(myStoreInfoDto.getStoreNumber());
        storeInfo.updateSellerName(myStoreInfoDto.getSellerName());
        storeInfo.updateAddress(myStoreInfoDto.getAddress());
        storeInfo.updatePhoneNumber(myStoreInfoDto.getPhoneNumber());

        storeInfoRepository.save(storeInfo);

        myStoreInfoDto.setStoreId(storeInfo.getStoreInfoId());

        return myStoreInfoDto;
    }

    public List<MyDeliveryRegionDto> getMyDeliveryRegion(Long memberId) {
        List<StoreDeliveryRegion> myDeliveryRegionList = storeDeliveryRegionRepository.findBySellerMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_SELLER_DELIVERY_REGION));

        return myDeliveryRegionList.stream()
                .map(myDeliveryRegion -> MyDeliveryRegionDto.builder()
                        .storeDeliveryRegionId(myDeliveryRegion.getStoreDeliveryRegionId())
                        .sidoCode(myDeliveryRegion.getSido().getSidoCode())
                        .sigunguCode(myDeliveryRegion.getSigungu().getSigunguCode())
                        .dongCode(myDeliveryRegion.getDong().getDongCode())
                        .build())
                .collect(Collectors.toList());



    }

//    @Transactional
//    public MyDeliveryRegionDto updateDeliveryRegion(Long memberId, List<MyDeliveryRegionDto> myDeliveryRegionDto) {
//
//        storeDeliveryRegionRepository.deleteBySellerMemberId(memberId);
//
//        List<StoreDeliveryRegion> newDeliveryRegion=  myDeliveryRegionDto.stream()
//                .map(region -> new StoreDeliveryRegion(
//                        null,
//                        region.getSidoCode(),
//                        region.getSigunguCode(),
//                        region.getDongCode()
//                ))
//                .collect(Collectors.toList());
//
//
//    }
}
