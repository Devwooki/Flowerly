package com.ssafy.flowerly.mypage.service;


import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final MemberRepository memberRepository;


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
}
