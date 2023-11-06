package com.ssafy.flowerly.member.model;
import com.ssafy.flowerly.address.repository.DongRepository;
import com.ssafy.flowerly.address.repository.SidoRepository;
import com.ssafy.flowerly.address.repository.SigunguRepository;
import com.ssafy.flowerly.entity.*;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.MemberRole;
import com.ssafy.flowerly.member.vo.MemberDto;
import com.ssafy.flowerly.seller.model.StoreDeliveryRegionRepository;
import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.entity.StoreImage;
import com.ssafy.flowerly.entity.StoreInfo;
import com.ssafy.flowerly.member.vo.StoreInfoDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

import java.util.*;


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
    private final JWTService jwtService;


    public MemberDto getMemberInfo(Long memberId) {
        MemberDto memberInfo = memberRepository.findByMemberId(memberId)
                .map(Member::toDto)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));

        //상점 정보가 있으면 값을 넣고 없으면 null을 넣는더.
        memberInfo.setStore(getStoreInfo(memberId));
        return memberInfo;
    }

    @Transactional
    public void signupBuyer(Map<String, Object> data, Long memberId) {

        //유저가 있는지 확인
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));


        member.updateRole(MemberRole.USER);
        member.updateNickName((String) data.get("nickname"));
        memberRepository.save(member);
    }

    @Transactional    
    public void signupSeller(Map<String, Object> data, Long memberId) {

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));

        member.updateRole(MemberRole.SELLER);


        Map<String, Object> sellerInput = (Map<String, Object>) data.get("sellerInput");

        Map<String, Object> sellerAddress = (Map<String, Object>) data.get("sellerAddress");

        String sidoName = (String) sellerAddress.get("sido");
        String sigunguName = (String) sellerAddress.get("sigungu");
        String dongName = (String) sellerAddress.get("dong");


        // 시도, 시군구, 동 코드 조회

        Sido sido = sidoRepository.findBySidoName(sidoName)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_SIDO));

        Sigungu sigungu = sigunguRepository.findBySigunguNameAndSido(sigunguName, sido)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_SIGUNGU));

        Dong dong = dongRepository.findByDongNameAndSigungu(dongName, sigungu)
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

        List<Map<String, Object>> deliveryRegions = (List<Map<String, Object>>) data.get("deliveryRegions");

        for (Map<String, Object> deliveryRegion : deliveryRegions) {
            Long sidoCode = ((Number)deliveryRegion.get("sidoCode")).longValue();
            Long sigunguCode = ((Number)deliveryRegion.get("sigunguCode")).longValue();
            Long dongCode = ((Number)deliveryRegion.get("dongCode")).longValue();


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

    public StoreInfoDto getStoreInfo(Long memberId){
        List<Object[]> object = storeInfoRepository.findBySellerInfo(memberId);
        //반환값 길이가 0이면 멤버 정보가 없다는 것이다.
        if (!object.isEmpty()){
            StoreInfoDto storeInfoDto = extractStoreInfoDto(object);
            List<String> images = new ArrayList<>();
            //이미지 추가
            for (Object[] o : object) {
                if(o[1] == null) break;
                storeInfoDto.getImages().add(extractImageUrl(o));
            }
            storeInfoDto.setImages(images);
            return storeInfoDto;
        }
        return null;
    }

    private StoreInfoDto extractStoreInfoDto(List<Object[]> object){
        return ((StoreInfo) object.get(0)[0]).toDto();
    }

    private String extractImageUrl(Object[] o){
        return ((StoreImage) o[1]).getImageUrl();
    }
}
