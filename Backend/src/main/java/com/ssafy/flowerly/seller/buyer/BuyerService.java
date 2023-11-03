package com.ssafy.flowerly.seller.buyer;


import com.ssafy.flowerly.address.repository.DongRepository;
import com.ssafy.flowerly.address.repository.SigunguRepository;
import com.ssafy.flowerly.entity.Flly;
import com.ssafy.flowerly.entity.FllyParticipation;
import com.ssafy.flowerly.entity.StoreInfo;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.member.vo.StoreInfoDto;
import com.ssafy.flowerly.s3.model.S3Service;
import com.ssafy.flowerly.seller.model.*;
import com.ssafy.flowerly.seller.vo.FllyRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BuyerService {
    private final FllyRepository fllyRepository;
    private final RequestRepository requestRepository;
    private final FllyParticipationRepository fllyParticipationRepository;
    private final MemberRepository memberRepository;
    private final StoreDeliveryRegionRepository storeDeliveryRegionRepository;

    private final StoreInfoRepository storeInfoRepository;
    private final DongRepository dongRepository;
    private final SigunguRepository sigunguRepository;
    private final FllyPickupRegionRepository fllyPickupRegionRepository;
    private final S3Service s3Service;

    //진행중인 플리목록
    public Page<FllyRequestDto> getMyFlly(Pageable pageable, Long memberId) {
        return fllyRepository.findFllyByConsumerMemberId(pageable, memberId)
                .map(FllyList -> FllyList.map(Flly::toFllyRequestDto))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_FLLY));
    }

    //플리스트 찾기
    public Page<?> getFlist(Pageable pageable, Long fllyId) {

        return fllyParticipationRepository.findFlistByFllyId(pageable, fllyId).map(obj -> {
            log.info("object size : {}", obj.length);
            log.info("{} : ",obj);
            return obj;
        });
    }
}
