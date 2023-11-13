package com.ssafy.flowerly.chatting.service;

import com.ssafy.flowerly.chatting.dto.*;
import com.ssafy.flowerly.chatting.repository.RequestDeliveryInfoRepository;
import com.ssafy.flowerly.entity.*;
import com.ssafy.flowerly.chatting.repository.ChattingMessageRepository;
import com.ssafy.flowerly.chatting.repository.ChattingRepository;
import com.ssafy.flowerly.entity.type.OrderType;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.MemberRole;
import com.ssafy.flowerly.member.model.MemberRepository;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.seller.model.FllyDeliveryRegionRepository;
import com.ssafy.flowerly.seller.model.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChattingService {
    private final StompChatService stompChatService;

    private final MemberRepository memberRepository;
    private final StoreInfoRepository storeInfoRepository;
    private final ChattingRepository chattingRepository;
    private final ChattingMessageRepository chattingMessageRepository;
    private final RequestRepository requestRepository;
    private final RequestDeliveryInfoRepository requestDeliveryInfoRepository;
    private final FllyDeliveryRegionRepository fllyDeliveryRegionRepository;

    public List<ChattingDto.BasicResponse> getChattingList(Long memberId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();

        List<Chatting> chattingList = null;
        List<ChattingDto.BasicResponse> chattingDtoList = new ArrayList<>();

        if(member.getRole().equals(MemberRole.USER)) {  // 소비자 입장인 경우
            chattingList = chattingRepository.findAllByConsumerAndIsRemovedConsumerFalse(member);

            for(Chatting chatting : chattingList) {
                Member opponent = chatting.getSeller();
                String opponentName = storeInfoRepository.findStoreName(opponent);
                ChattingDto.BasicResponse chattingDto = ChattingDto.BasicResponse.of(chatting, chatting.getUnreadCntConsumer(), opponent.getMemberId(), opponentName);
                chattingDtoList.add(chattingDto);
            }
        } else if(member.getRole().equals(MemberRole.SELLER)) {  // 판매자 입장인 경우
            chattingList = chattingRepository.findAllBySellerAndIsRemovedSellerFalse(member);

            for(Chatting chatting : chattingList) {
                Member opponent = chatting.getConsumer();
                ChattingDto.BasicResponse chattingDto = ChattingDto.BasicResponse.of(chatting, chatting.getUnreadCntSeller(), opponent.getMemberId(), opponent.getNickName());
                chattingDtoList.add(chattingDto);
            }
        } else {
            // 예외 던지기
        }

        return chattingDtoList;
    }

    public ChattingDto.RoomResponse getChattingRoomInfoNMessages(Long memberId, Long chattingId, Integer size) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();
        Chatting chatting = chattingRepository.findById(chattingId).orElseThrow();

        Long opponentMemberId = null;
        String opponentName = null;
        if(member.getRole().equals(MemberRole.USER)) {
            Member opponent = chatting.getSeller();
            opponentMemberId = opponent.getMemberId();
            opponentName = storeInfoRepository.findStoreName(opponent);
        } else if(member.getRole().equals(MemberRole.SELLER)) {
            Member opponent = chatting.getConsumer();
            opponentMemberId = opponent.getMemberId();
            opponentName = opponent.getNickName();
        }

        PageRequest pageRequest = PageRequest.of(0, size, Sort.Direction. DESC, "sendTime");
        List<ChattingMessage> messages = chattingMessageRepository.findAllByChattingId(chattingId, pageRequest).getContent();
        List<ChattingMessage> sortedMessages = messages.stream().sorted(Comparator.comparing(ChattingMessage::getSendTime)).collect(Collectors.toList());

        List<ChattingMessageDto.Response> messageDtos = new ArrayList<>();
        for(ChattingMessage message : sortedMessages) {
            messageDtos.add(ChattingMessageDto.Response.of(message));
        }

        return new ChattingDto.RoomResponse(
                chattingId,
                opponentMemberId,
                opponentName,
                sortedMessages.size() > 0 ? sortedMessages.get(0).getId() : null,
                messageDtos
        );
    }

    public Map<String, Object> getChattingMessages(Long chattingId, String lastId, Integer size) {
        ObjectId objectId = new ObjectId(lastId);
        PageRequest pageRequest = PageRequest.of(0, size, Sort.Direction. DESC, "sendTime");
        List<ChattingMessage> messages = chattingMessageRepository.findChattingMessagesByIdBeforeAndChattingId(objectId, chattingId, pageRequest).getContent();
        List<ChattingMessage> sortedMessages = messages.stream().sorted(Comparator.comparing(ChattingMessage::getSendTime)).collect(Collectors.toList());

        List<ChattingMessageDto.Response> messageDtos = new ArrayList<>();
        for(ChattingMessage message : sortedMessages) {
            messageDtos.add(ChattingMessageDto.Response.of(message));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("lastId", sortedMessages.size() > 0 ? sortedMessages.get(0).getId() : null);
        response.put("messages", messageDtos);

        return response;
    }

    @Transactional
    public void saveChattingMessage(StompChatRequest messageDto) {
        // 채팅 메세지 MongoDB 저장
        ChattingMessage message = ChattingMessage.toEntity(messageDto);
        chattingMessageRepository.save(message);

        // 채팅방 마지막 메세지 및 읽지 않은 메세지수 업데이트
        Chatting chatting = chattingRepository.findById(messageDto.getChattingId())
                .orElseThrow(() -> new CustomException(ErrorCode.CHATTING_NOT_FOUND));
        String msgContent = message.getType().equals("IMAGE") ? "사진을 보냈습니다." : message.getContent();
        chatting.updateChatting(msgContent, message.getSendTime());

        Member member = memberRepository.findByMemberId(message.getMemberId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));
        if(member.getRole().equals(MemberRole.SELLER)) {
            Long otherMemberId = chatting.getConsumer().getMemberId();
            if(!stompChatService.isUserConnected(otherMemberId, chatting.getChattingId())) chatting.updateUnreadCntConsumer();
        } else {
            Long otherMemberId = chatting.getSeller().getMemberId();
            if(!stompChatService.isUserConnected(otherMemberId, chatting.getChattingId())) chatting.updateUnreadSeller();
        }
    }

    @Transactional
    public void readChattingMessage(Long memberId, Long chattingId) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_MEMBER));
        Chatting chatting = chattingRepository.findById(chattingId)
                .orElseThrow(() -> new CustomException(ErrorCode.CHATTING_NOT_FOUND));

        chatting.readChatting(member);
    }

    @Transactional
    public Long saveRequestPrice(RequestFromChattingDto requestDto, Long chattingId) {
        Chatting chatting = chattingRepository.findById(chattingId)
                .orElseThrow(() -> new CustomException(ErrorCode.CHATTING_NOT_FOUND));

        Request request = null;
        Optional<Request> prevRequest = requestRepository.findByFllyAndSeller(chatting.getFlly(), chatting.getSeller());
        if(prevRequest.isPresent()) {  // 이미 작성한 주문이 있는 경우
            request = prevRequest.get();

            if(request.getPrice() != -1) {  // 금액이 설정된 주문은 업데이트 불가
                return null;
            }

            if(request.getOrderType().equals(OrderType.DELIVERY)) { // 이전 주문이 배달이었던 경우
                RequestDeliveryInfo deliveryInfo = requestDeliveryInfoRepository.findByRequest(request)
                        .orElseThrow(() -> new CustomException(ErrorCode.REQUEST_DELIVERY_NOT_FOUND));

                if(requestDto.getOrderType().equals("PICKUP")) {  // 새로운 주문이 픽업인 경우 - 배달 정보 삭제
                    requestDeliveryInfoRepository.delete(deliveryInfo);
                } else {  // 새로운 주문이 배달인 경우 - 배달 정보 덮어쓰기
                    deliveryInfo.updateDeliveryInfo(requestDto);
                }
            } else if(requestDto.getOrderType().equals("DELIVERY")) {
                RequestDeliveryInfo deliveryInfo = RequestDeliveryInfo.builder()
                        .request(request)
                        .recipientName(requestDto.getRecipientName())
                        .phoneNumber(requestDto.getRecipientPhoneNumber())
                        .address(requestDto.getAddress())
                        .build();
                requestDeliveryInfoRepository.save(deliveryInfo);
            }

            request.updateRequestInfo(requestDto);  // 주문 정보 업데이트
        } else {  // 새로운 주문인 경우
            request = Request.builder()
                    .flly(chatting.getFlly())
                    .seller(chatting.getSeller())
                    .orderName(requestDto.getOrdererName())
                    .phoneNumber(requestDto.getPhoneNumber())
                    .orderType(requestDto.getOrderType().equals("DELIVERY") ? OrderType.DELIVERY : OrderType.PICKUP)
                    .deliveryPickupTime(stringToTime(requestDto.getDeliveryPickupTime()))
                    .requestContent(requestDto.getRequestContent())
                    .price(-1)
                    .build();
            request = requestRepository.save(request);

            if(requestDto.getOrderType().equals("DELIVERY")) {
                RequestDeliveryInfo deliveryInfo = RequestDeliveryInfo.builder()
                        .request(request)
                        .recipientName(requestDto.getRecipientName())
                        .phoneNumber(requestDto.getRecipientPhoneNumber())
                        .address(requestDto.getAddress())
                        .build();
                requestDeliveryInfoRepository.save(deliveryInfo);
            }
        }

        return request.getRequestId();
    }

    public LocalDateTime stringToTime(String timeStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(timeStr, formatter);

        return dateTime;
    }

    @Transactional
    public void saveRequestPrice(Long requestId, Integer price) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new CustomException(ErrorCode.REQUEST_NOT_FOUND));

        if(request.getIsPaid()) {
            throw new CustomException(ErrorCode.REQUEST_ALREADY_PAID);
        } else {
            request.setRequestPrice(price);
        }
    }

    public FllyFromChattingDto.Participation getParticipationInfo(Long chattingId) {
        Chatting chatting = chattingRepository.findById(chattingId)
                .orElseThrow(() -> new CustomException(ErrorCode.CHATTING_NOT_FOUND));
        return FllyFromChattingDto.Participation.of(chatting.getConsumer().getNickName(), chatting.getFllyParticipation());
    }

    public FllyFromChattingDto.FllyInfo getFllyInfo(Long chattingId) {
        Chatting chatting = chattingRepository.findById(chattingId)
                .orElseThrow(() -> new CustomException(ErrorCode.CHATTING_NOT_FOUND));

        Flly flly = chatting.getFlly();
        FllyFromChattingDto.FllyInfo fllyDto = FllyFromChattingDto.FllyInfo.of(flly);
        if(flly.getOrderType().equals(OrderType.DELIVERY)) {
            FllyDeliveryRegion deliveryRegion = fllyDeliveryRegionRepository.findByFlly(flly)
                    .orElseThrow();
            fllyDto.setAddress(deliveryRegion.getSido().getSidoName() + " " + deliveryRegion.getSigungu().getSigunguName());
        }

        return fllyDto;
    }

    public RequestFromChattingDto getRequestInfo(Long chattingId) {
        Chatting chatting = chattingRepository.findById(chattingId)
                .orElseThrow(() -> new CustomException(ErrorCode.CHATTING_NOT_FOUND));

        RequestFromChattingDto requestFromChattingDto = new RequestFromChattingDto();

        Request request = requestRepository.findByFllyAndSeller(chatting.getFlly(), chatting.getSeller())
                .orElseThrow(() -> new CustomException(ErrorCode.REQUEST_NOT_FOUND));
        String storeName = storeInfoRepository.findStoreName(request.getSeller());
        requestFromChattingDto.setRequestInfo(request, storeName);

        if(request.getOrderType().equals(OrderType.DELIVERY)) {
            RequestDeliveryInfo deliveryInfo = requestDeliveryInfoRepository.findByRequest(request)
                    .orElseThrow(() -> new CustomException(ErrorCode.REQUEST_DELIVERY_NOT_FOUND));
            requestFromChattingDto.setDeliveryInfo(deliveryInfo);
        }

        return requestFromChattingDto;
    }

    public Map<String, Object> getPrice(Long chattingId) {
        Map<String, Object> responseDto = new HashMap<>();

        Chatting chatting = chattingRepository.findById(chattingId)
                .orElseThrow(() -> new CustomException(ErrorCode.CHATTING_NOT_FOUND));
        Request request = requestRepository.findByFllyAndSeller(chatting.getFlly(), chatting.getSeller())
                .orElseThrow(() -> new CustomException(ErrorCode.REQUEST_NOT_FOUND));

        responseDto.put("requestId", request.getRequestId());
        responseDto.put("sellerName", storeInfoRepository.findStoreName(request.getSeller()));
        responseDto.put("price", request.getPrice());
        responseDto.put("isPaid", request.getIsPaid());

        return responseDto;
    }

    @Transactional
    public void exitChatting(Long chattingId, Long memberId) {
        Chatting chatting = chattingRepository.findById(chattingId)
                .orElseThrow(() -> new CustomException(ErrorCode.CHATTING_NOT_FOUND));
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();
        chatting.deleteChatting(member.getRole());
    }
}

