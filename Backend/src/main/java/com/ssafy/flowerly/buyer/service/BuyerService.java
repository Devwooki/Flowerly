package com.ssafy.flowerly.buyer.service;


import com.ssafy.flowerly.buyer.dto.BuyerFllyDto;
import com.ssafy.flowerly.chatting.repository.RequestDeliveryInfoRepository;
import com.ssafy.flowerly.entity.*;
import com.ssafy.flowerly.entity.type.OrderType;
import com.ssafy.flowerly.entity.type.ProgressType;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.buyer.dto.BuyerFlly;
import com.ssafy.flowerly.buyer.dto.Flist;
import com.ssafy.flowerly.seller.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BuyerService {
    private final FllyRepository fllyRepository;
    private final RequestRepository requestRepository;
    private final FllyParticipationRepository fllyParticipationRepository;
    private final FllyDeliveryRegionRepository fllyDeliveryRegionRepository;
    private final StoreInfoRepository storeInfoRepository;
    private final RequestDeliveryInfoRepository requestDeliveryInfoRepository;

    /**진행중인 플리 목록
     * @Param pageable : 페이지네이션 적용
     * @Param MemberId : 진행중인 플리 조회할 유저 id
     */
    public Page<BuyerFllyDto> getMyFlly(Pageable pageable, Long memberId) {
        List<ProgressType> progressTypeList = new ArrayList<>();
        progressTypeList.add(ProgressType.FINISH_DELIVERY);
        progressTypeList.add(ProgressType.CANCELED);
        return fllyRepository.findFllyByConsumerMemberIdNotLikeFinish(pageable, memberId, progressTypeList)
                .map(curFlly -> fllyToBuyerDto(curFlly));
    }

    /** 플리스트 조회
     * @Param pageable : 페이지네이션 적용
     * @Param fllyId : 조회하려는 플리 ID
     * */
    public BuyerFlly getFlist(Pageable pageable, Long fllyId) {
        return new BuyerFlly(getFllyResponseDto(fllyId),
                getParticipants(pageable, fllyId));
    }

    /** 플리 참여자 조회
     * @Param pageable : 페이지네이션 적용
     * @Param fllyId : 조회하려는 플리 ID
     * */
    public Page<Flist> getParticipants(Pageable pageable, Long fllyId) {
        return fllyParticipationRepository.findFlistByFllyId(pageable, fllyId)
                .map(obj -> new Flist(((FllyParticipation) obj[1]).toResponseDto(), ((StoreInfo) obj[0]).toDto()));
    }

    /** 플리 상세 조회 - getMyFlly의 개별 결과와 같음
     * @Param fllyId : 조회하려는 fllyId
     * */
    private BuyerFllyDto getFllyResponseDto(Long fllyId) {
        return fllyRepository.findByFllyIdAndActivate(fllyId)
                .map(curFlly -> fllyToBuyerDto(curFlly))
                .orElseThrow(() -> new CustomException(ErrorCode.FLLY_NOT_FOUND));
    }

    /** flly to 구매자 Dto
     * @Param : 변환할 FllyEntity
     * */
    private BuyerFllyDto fllyToBuyerDto(Flly curFlly) {

        //반환할 BuyerFllyDto 객체 생성
        BuyerFllyDto buyerFlly = curFlly.toBuyerFlly();

        StringBuilder fllyRequestAddress = new StringBuilder();
        if (curFlly.getOrderType().equals(OrderType.DELIVERY)) {
            FllyDeliveryRegion addressInfo = fllyDeliveryRegionRepository.findByFlly(curFlly)
                    .orElseGet(null);

            fllyRequestAddress
                    .append(addressInfo.getSido().getSidoName() + " ")
                    .append(addressInfo.getSigungu().getSigunguName() + " ")
                    .append(addressInfo.getDong().getDongName() + " ")
                    .append((String) addressInfo.getDeliveryAddress());
        }
        buyerFlly.setRequestAddress(fllyRequestAddress.toString());

        //Progress : "입찰" || "조율" -> 업체 이름 "입찰" || "조율"
        if (curFlly.getProgress().equals(ProgressType.START)
                || curFlly.getProgress().equals(ProgressType.DISCUSSION)) {
            buyerFlly.setStoreName(curFlly.getProgress().getTitle());
        } else {
            // 결제한 회사가 없으면 아직 조율이 완료된 것이 아니다.
            try {
                requestRepository.findByFllyAndIsPaidTrue(curFlly)
                        .map(request -> { //조율된 업체가 있으면 Store이름을 바꾸고
                            String requestStoreName = storeInfoRepository.findStoreName(request.getSeller().getMemberId());
                            buyerFlly.setStoreName(requestStoreName);
                            return request;
                        })
                        .orElseGet(() -> { //조율된 업체가 없으면 Process 그대로
                            buyerFlly.setStoreName(curFlly.getProgress().getTitle());
                            return null;
                        });
            } catch (Exception e) {
                log.error("플리조회중 예외 발생 {}", e.getMessage());
                throw new CustomException(ErrorCode.DUPLICATE_REQUEST_PAID);
            }

        }
        return buyerFlly;
    }
}
