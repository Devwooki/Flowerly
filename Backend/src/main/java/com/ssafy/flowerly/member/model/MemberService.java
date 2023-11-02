package com.ssafy.flowerly.member.model;

import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.entity.StoreInfo;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.MemberRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    private final StoreInfoRepository StoreInfoRepository;


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

        // storeinfo
        // address에서 시군구 짤라서 코드 저장해야함
        StoreInfo storeInfo = StoreInfo.builder()
                .seller(member)
                .storeName((String) data.get("storename"))
                .sellerName((String) data.get("sellername"))
                .phoneNumber((String) data.get("phonenumber"))
                .storeNumber((String) data.get("storenumber"))
                .address((String) data.get("address"))
                .build();

        // 배달 가능 지역 코드로 저장하기


        StoreInfoRepository.save(storeInfo);




    }




}
