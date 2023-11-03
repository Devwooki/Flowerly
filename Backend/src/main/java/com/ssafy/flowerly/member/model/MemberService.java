package com.ssafy.flowerly.member.model;

import com.ssafy.flowerly.address.repository.DongRepository;
import com.ssafy.flowerly.address.repository.SidoRepository;
import com.ssafy.flowerly.address.repository.SigunguRepository;
import com.ssafy.flowerly.entity.*;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.MemberRole;
import com.ssafy.flowerly.seller.model.StoreDeliveryRegionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {


    private final MemberRepository memberRepository;

    private final StoreInfoRepository storeInfoRepository;

    private final SidoRepository sidoRepository;

    private final SigunguRepository sigunguRepository;

    private final DongRepository dongRepository;

    private final StoreDeliveryRegionRepository storeDeliveryRegionRepository;


    @Transactional
    public void signupBuyer(Map<String, Object> data, Long memberId) {

        //유저가 있는지 확인
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));


        member.updateRole(MemberRole.USER);
        member.updateNickName((String) data.get("nickname"));
        memberRepository.save(member);
    }

    public void signupSeller(Map<String, Object> data, Long memberId) {

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));

        member.updateRole(MemberRole.SELLER);


        Map<String, Object> sellerInput = (Map<String, Object>) data.get("sellerInput");

        // 주소 분할
        String[] addressParts = ((String) data.get("address")).split(" ");
        if (addressParts.length < 3) {
            throw new CustomException(ErrorCode.INVALID_ADDRESS_FORMAT);
        }

        // 시도, 시군구, 동 코드 조회

        Sido sido = sidoRepository.findBySidoName(addressParts[0])
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_SIDO));

        Sigungu sigungu = sigunguRepository.findBySigunguNameAndSido(addressParts[1], sido)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_SIGUNGU));

        Dong dong = dongRepository.findByDongNameAndSigungu(addressParts[2], sigungu)
                .orElseThrow(() -> new CustomException((ErrorCode.NOT_FIND_DONG)));



        // storeinfo

        StoreInfo storeInfo = StoreInfo.builder()
                .seller(member)
                .storeName((String) sellerInput.get("storename"))
                .sellerName((String) sellerInput.get("sellername"))
                .phoneNumber((String) sellerInput.get("phonenumber"))
                .storeNumber((String) sellerInput.get("storenumber"))
                .address((String) sellerInput.get("address"))
                .sido(sido)
                .sigungu(sigungu)
                .dong(dong)
                .build();




        storeInfoRepository.save(storeInfo);



        // storeDeliveryRegion 저장하기

        List<Map<String, Integer>> deliveryRegions = (List<Map<String, Integer>>) data.get("deliveryRegions");

        for (Map<String, Integer> deliveryRegion : deliveryRegions) {
            Integer sidoCode = deliveryRegion.get("sidoCode");
            Integer sigunguCode = deliveryRegion.get("sigunguCode");
            Integer dongCode = deliveryRegion.get("dongCode");

            Sido deliverySido = sidoRepository.findBySidoCode(sidoCode)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_SIDO));

            Sigungu deliverySigungu = sigunguRepository.findBySigunguCodeAndSido(sigunguCode, deliverySido)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_SIGUNGU));

            Dong deliveryDong = dongRepository.findByDongCodeAndSigungu(dongCode, deliverySigungu)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_DONG));

            StoreDeliveryRegion storeDeliveryRegion = StoreDeliveryRegion.builder()
                    .seller(member)
                    .sido(deliverySido)
                    .sigungu(deliverySigungu)
                    .dong(deliveryDong)
                    .build();

            storeDeliveryRegionRepository.save(storeDeliveryRegion);
        }





    }




}
