package com.ssafy.flowerly.mypage.service;


import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.entity.StoreImage;
import com.ssafy.flowerly.entity.StoreInfo;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.mypage.dto.StoreMyPageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final MemberRepository memberRepository;
    private final StoreInfoRepository storeInfoRepository;


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




}
