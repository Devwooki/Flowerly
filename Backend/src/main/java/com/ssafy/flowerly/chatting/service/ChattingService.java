package com.ssafy.flowerly.chatting.service;

import com.ssafy.flowerly.chatting.dto.ChattingDto;
import com.ssafy.flowerly.chatting.repository.ChattingRepository;
import com.ssafy.flowerly.entity.Chatting;
import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.member.MemberRole;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChattingService {
    private final MemberRepository memberRepository;
    private final StoreInfoRepository storeInfoRepository;
    private final ChattingRepository chattingRepository;

    public List<ChattingDto> getChattingList(Long memberId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();

        List<Chatting> chattingList = null;
        List<ChattingDto> chattingDtoList = new ArrayList<>();

        if(member.getRole().equals(MemberRole.USER)) {  // 소비자 입장인 경우
            chattingList = chattingRepository.findAllByConsumerAndIsRemovedFalse(member);

            for(Chatting chatting : chattingList) {
                Member opponent = chatting.getSeller();
                String opponentName = storeInfoRepository.findStoreName(opponent);
                ChattingDto chattingDto = ChattingDto.of(chatting, opponent.getMemberId(), opponentName);
                chattingDtoList.add(chattingDto);
            }
        } else if(member.getRole().equals(MemberRole.SELLER)) {  // 판매자 입장인 경우
            chattingList = chattingRepository.findAllBySellerAndIsRemovedFalse(member);

            for(Chatting chatting : chattingList) {
                Member opponent = chatting.getConsumer();
                ChattingDto chattingDto = ChattingDto.of(chatting, opponent.getMemberId(), opponent.getNickName());
                chattingDtoList.add(chattingDto);
            }
        } else {
            // 예외 던지기
        }

        return chattingDtoList;
    }
}
