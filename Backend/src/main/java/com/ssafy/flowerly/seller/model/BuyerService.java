package com.ssafy.flowerly.seller.model;


import com.ssafy.flowerly.address.repository.DongRepository;
import com.ssafy.flowerly.address.repository.SigunguRepository;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.s3.model.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

@Service
@Slf4j
@RequiredArgsConstructor
public class BuyerService {
    private final FllyRepository fellyRepository;
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
    public Object getMyFlly(Long memberId) {
        return null;
    }
}
