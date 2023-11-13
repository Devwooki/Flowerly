package com.ssafy.flowerly.seller.buyer;


import com.ssafy.flowerly.address.repository.DongRepository;
import com.ssafy.flowerly.address.repository.SigunguRepository;
import com.ssafy.flowerly.chatting.repository.RequestDeliveryInfoRepository;
import com.ssafy.flowerly.entity.*;
import com.ssafy.flowerly.entity.type.OrderType;
import com.ssafy.flowerly.entity.type.ProgressType;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.member.vo.StoreInfoDto;
import com.ssafy.flowerly.s3.model.S3Service;
import com.ssafy.flowerly.seller.buyer.dto.BuyerFlly;
import com.ssafy.flowerly.seller.buyer.dto.BuyerFllyDto;
import com.ssafy.flowerly.seller.buyer.dto.Flist;
import com.ssafy.flowerly.seller.buyer.dto.FllyParticipateResponseDto;
import com.ssafy.flowerly.seller.model.*;
import com.ssafy.flowerly.seller.vo.FllyRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    //진행중인 플리목록
    public Page<BuyerFllyDto> getMyFlly(Pageable pageable, Long memberId) {
        return fllyRepository.findFllyByConsumerMemberIdNotLikeFinish(pageable, memberId, ProgressType.FINISH_DELIVERY).map(flly -> {
            Long fllyId = flly.getFllyId();
            Flly curFlly = fllyRepository.findByFllyId(fllyId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_FLLY));

            // 결제한 회사가 없으면 아직 조율이 완료된 것이 아니다.
            Request request = requestRepository.findByFllyFllyIdAndIsPaidTrue(fllyId).orElse(null);

            //String address = "";
            //if(request != null) address = requestDeliveryInfoRepository.findAddressByRequestId(request.getRequestId()).orElse(null);

            String address2 = "";
            if(curFlly.getOrderType().equals(OrderType.DELIVERY)) {
                FllyDeliveryRegion fllyDeliveryRegion = fllyDeliveryRegionRepository.findByFllyFllyId(fllyId)
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_FLLY_DELIVERYREGION));
                String sido = fllyDeliveryRegion.getSido().getSidoName();
                String sigugun = fllyDeliveryRegion.getSigungu().getSigunguName();
                String dong = fllyDeliveryRegion.getDong().getDongName();
                address2 = sido + " " + sigugun + " " + dong;
            }

            //입찰, 조욜중일 떈 업체 정보가 출력되지 않는다
            if(flly.getProgress().getTitle().equals("입찰")||flly.getProgress().getTitle().equals("조율")){
                return flly.toBuyerFlly(
                        flly.getProgress().getTitle(), address2);
            }
            else{
                //입찰된 건이 없으면 기존 정보를 입력한다
                if(request == null)
                    return flly.toBuyerFlly(
                            flly.getProgress().getTitle(), address2);

                //입찰된 건이 있으므로 주소를 입력한다.
                return flly.toBuyerFlly(
                        storeInfoRepository.findStoreName(request.getSeller().getMemberId()), address2);
            }
        });
    }

    //플리스트 찾기
    public BuyerFlly getFlist(Pageable pageable, Long fllyId) {
        return new BuyerFlly(getFllyResponseDto(fllyId),
                getParticipants(pageable, fllyId));
    }

    public Page<Flist> getParticipants(Pageable pageable, Long fllyId){
        return fllyParticipationRepository.findFlistByFllyId(pageable, fllyId)
                .map(obj -> new Flist(((FllyParticipation) obj[1]).toResponseDto(), ((StoreInfo) obj[0]).toDto()));
    }

    private FllyRequestDto getFllyResponseDto(Long fllyId){
        return fllyRepository.findByFllyIdAndActivate(fllyId)
                .map(Flly::toFllyRequestDto)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_FLLY));
    }
}
