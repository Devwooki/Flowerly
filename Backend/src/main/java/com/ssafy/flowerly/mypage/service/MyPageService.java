package com.ssafy.flowerly.mypage.service;


import com.ssafy.flowerly.address.repository.DongRepository;
import com.ssafy.flowerly.address.repository.SidoRepository;
import com.ssafy.flowerly.address.repository.SigunguRepository;
import com.ssafy.flowerly.entity.*;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.mypage.dto.*;
import com.ssafy.flowerly.review.repository.ReviewRepository;
import com.ssafy.flowerly.s3.model.StoreImageRepository;
import com.ssafy.flowerly.seller.model.FllyParticipationRepository;
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
    private final SidoRepository sidoRepository;
    private final SigunguRepository sigunguRepository;
    private final DongRepository dongRepository;
    private final StoreImageRepository storeImageRepository;
    private final FllyParticipationRepository fllyParticipationRepository;


    public Object getNickName(Long memberId) {

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        return member.getNickName();
    }

    public Object updateNickName(Long memberId, String newNickName) {

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        member.updateNickName(newNickName);
        memberRepository.save(member);

        return member.getNickName();

    }


    public Object updateNotification(Long memberId) {

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        String newNotificationStatus = member.notificationToggle();
        memberRepository.save(member);


        return newNotificationStatus;

    }

    @Transactional
    public StoreMyPageDto getStoreNameAndImg(Long memberId) {

        List<Object[]> results = storeInfoRepository.findBySellerInfo(memberId);

        if (results.isEmpty()) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");


        return requests.stream().map(request -> {
            Long fllyId = request.getFlly().getFllyId();


            Optional<FllyParticipation> participation = fllyParticipationRepository.findByFllyFllyIdAndSellerMemberId(request.getFlly().getFllyId(),  memberId);


            String imageUrl = participation.map(FllyParticipation::getImageUrl).orElse(null);

            return SellerFllyDto.builder()
                    .fllyId(fllyId)
                    .orderName(request.getOrderName())
                    .orderType(request.getOrderType().getTitle())
                    .deliveryPickupTime(request.getDeliveryPickupTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .progress(request.getFlly().getProgress().getTitle())
                    .imageUrl(imageUrl)
                    .createdAt(request.getCreatedAt() != null ? request.getCreatedAt().format(formatter) : null)
                    .build();
        }).collect(Collectors.toList());
    }


    public List<BuyerFllyDto> getBuyerFlly(Long memberId) {
        List<Flly> fllyList = fllyRepository.findByConsumerMemberId(memberId);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return fllyList.stream().map(flly -> {
            Optional<Request> paidRequestOpt = requestRepository.findByFllyFllyIdAndIsPaid(flly.getFllyId(), true);

            String storeName = null;
            String requestOrderType = null;
            String deliveryPickupTime = null;
            Boolean isReviewed = false;
            String createdAt = null;


            if (paidRequestOpt.isPresent()) {
                Request paidRequest = paidRequestOpt.get();
                storeName = paidRequest.getSeller().getNickName();
                requestOrderType = paidRequest.getOrderType().getTitle();
                deliveryPickupTime = paidRequest.getDeliveryPickupTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
                isReviewed = reviewRepository.existsByRequestRequestId(paidRequest.getRequestId());
                createdAt = paidRequest.getCreatedAt() != null ? paidRequest.getCreatedAt().format(formatter) : null;
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
                    .imageUrls(flly.getImageUrl())
                    .createdAt(createdAt)
                    .build();
        }).collect(Collectors.toList());

    }

    public MyStoreInfoDto getMyStoreInfo(Long memberId) {

        StoreInfo storeInfo = storeInfoRepository.findBySellerMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.STOREINFO_NOT_FOUND));

        List<StoreImage> storeImages = storeImageRepository.findBySeller_MemberId(memberId);


        List<ImageInfoDto> imageInfoDtos = storeImages.stream()
                .map(storeImage -> new ImageInfoDto(storeImage.getStoreImageId(), storeImage.getImageUrl()))
                .collect(Collectors.toList());

        return MyStoreInfoDto.builder()
                .storeId(storeInfo.getStoreInfoId())
                .storeName(storeInfo.getStoreName())
                .sellerName(storeInfo.getSellerName())
                .phoneNumber(storeInfo.getPhoneNumber())
                .storeNumber(storeInfo.getStoreNumber())
                .address(storeInfo.getAddress())
                .images(imageInfoDtos)
                .build();
    }

    @Transactional
    public MyStoreInfoDto updateMyStoreInfo(Long memberId, MyStoreInfoDto myStoreInfoDto) {
        StoreInfo storeInfo = storeInfoRepository.findBySellerMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.STOREINFO_NOT_FOUND));

        storeInfo.updateStoreName(myStoreInfoDto.getStoreName());
        storeInfo.updateStoreNumber(myStoreInfoDto.getStoreNumber());
        storeInfo.updateSellerName(myStoreInfoDto.getSellerName());
        storeInfo.updateAddress(myStoreInfoDto.getAddress());
        storeInfo.updatePhoneNumber(myStoreInfoDto.getPhoneNumber());


        // 시도, 시군구, 동 코드 조회

        Sido sido = sidoRepository.findBySidoName(myStoreInfoDto.getSidoName())
                .orElseThrow(() -> new CustomException(ErrorCode.SIDO_NOT_FOUND));

        Sigungu sigungu = sigunguRepository.findBySigunguNameAndSido(myStoreInfoDto.getSigunguName(), sido)
                .orElseThrow(() -> new CustomException(ErrorCode.SIGUNGU_NOT_FOUND));

        Dong dong = dongRepository.findByDongNameAndSigungu(myStoreInfoDto.getDongName(), sigungu)
                .orElseThrow(() -> new CustomException((ErrorCode.DONG_NOT_FOUND)));


        storeInfo.updateSido(sido);
        storeInfo.updateSigungu(sigungu);
        storeInfo.updateDong(dong);


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
                        .fullAddress(myDeliveryRegion.getSido().getSidoName() + " " +
                                myDeliveryRegion.getSigungu().getSigunguName() + " " +
                                myDeliveryRegion.getDong().getDongName())
                        .build())
                .collect(Collectors.toList());


    }

    @Transactional
    public List<MyDeliveryRegionDto> updateDeliveryRegion(Long memberId, List<MyDeliveryRegionDto> myDeliveryRegionDtos) {

        storeDeliveryRegionRepository.deleteBySellerMemberId(memberId);


        List<MyDeliveryRegionDto> savedDtos = myDeliveryRegionDtos.stream()
                .map(dto -> {
                    Sido sido = sidoRepository.findBySidoCode(dto.getSidoCode())
                            .orElseThrow(() -> new CustomException(ErrorCode.SIDO_NOT_FOUND));
                    Sigungu sigungu = sigunguRepository.findBySigunguCodeAndSido(dto.getSigunguCode(), sido)
                            .orElseThrow(() -> new CustomException(ErrorCode.SIGUNGU_NOT_FOUND));
                    Dong dong = dongRepository.findByDongCodeAndSigungu(dto.getDongCode(), sigungu)
                            .orElseThrow(() -> new CustomException(ErrorCode.DONG_NOT_FOUND));
                    Member seller = memberRepository.findById(memberId)
                            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

                    StoreDeliveryRegion newRegion = StoreDeliveryRegion.builder()
                            .seller(seller)
                            .sido(sido)
                            .sigungu(sigungu)
                            .dong(dong)
                            .build();


                    StoreDeliveryRegion savedRegion = storeDeliveryRegionRepository.save(newRegion);

                    return MyDeliveryRegionDto.builder()
                            .storeDeliveryRegionId(savedRegion.getStoreDeliveryRegionId())
                            .sidoCode(sido.getSidoCode())
                            .sigunguCode(sigungu.getSigunguCode())
                            .dongCode(dong.getDongCode())
                            .fullAddress(savedRegion.getSido().getSidoName() + " " +
                            savedRegion.getSigungu().getSigunguName() + " " +
                            savedRegion.getDong().getDongName())
                            .build();
                }).collect(Collectors.toList());

        return savedDtos;
    }
};
