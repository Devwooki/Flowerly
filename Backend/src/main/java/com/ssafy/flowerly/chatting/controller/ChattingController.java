package com.ssafy.flowerly.chatting.controller;

import com.ssafy.flowerly.chatting.dto.ChattingDto;
import com.ssafy.flowerly.chatting.dto.FllyFromChattingDto;
import com.ssafy.flowerly.chatting.dto.RequestFromChattingDto;
import com.ssafy.flowerly.chatting.service.ChattingService;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.util.CustomResponse;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/chatting")
@RequiredArgsConstructor
public class ChattingController {

    private final ChattingService chattingService;

    /**
     * 채팅방 목록 조회 API
     * @param request 로그인한 유저의 id 추출
     * @return chattingList
     */
    @GetMapping
    public CustomResponse getChattingList(HttpServletRequest request){
        log.info("채팅방 목록 조회");
        Long memberId = (Long) request.getAttribute("memberId");
        //Long memberId = 1L;
        List<ChattingDto.BasicResponse> chattingList = chattingService.getChattingList(memberId);

        return new DataResponse<>(200, "채팅방 리스트 조회 성공", chattingList);
    }

    /**
     * 채팅방의 메세지 목록 조회
     * @param request 로그인한 유저의 id 추출
     * @param chattingId 조회할 채팅방 id
     * @return chattingRoom 채팅방 정보
     */
    @GetMapping("/{chattingId}")
    public CustomResponse getChattingMessageList(
            HttpServletRequest request,
            @PathVariable Long chattingId,
            @RequestParam(required = false) String lastId,
            @RequestParam(defaultValue = "50") Integer size) {
        log.info(chattingId + "번 채팅방 조회");
        Long memberId = (Long) request.getAttribute("memberId");
//        Long memberId = 1L;

        if(lastId == null) {
            ChattingDto.RoomResponse chattingRoom = chattingService.getChattingRoomInfoNMessages(memberId, chattingId, size);
            return new DataResponse<>(200, "채팅방 메세지 조회 성공", chattingRoom);
        } else {
            Map<String, Object> messages = chattingService.getChattingMessages(chattingId, lastId, size);
            return new DataResponse<>(200, "채팅방 메세지 조회 성공", messages);
        }
    }

    /**
     * 주문서 작성 내용 저장
     * @param chattingId 채팅 ID
     * @param requestDto 주문서 작성 내용
     * @return requestId 주문 ID
     */
    @PostMapping("/request/{chattingId}")
    public CustomResponse saveRequestInfo(@PathVariable Long chattingId, @RequestBody RequestFromChattingDto requestDto) {
        Long requestId = chattingService.saveRequestPrice(requestDto, chattingId);

        if(requestId == null) throw new CustomException(ErrorCode.REQUEST_PRICE_EXIST);
        return new DataResponse<Long>(200, "주문서 저장 성공", requestId);
    }

    /**
     * 결제 금액 설정
     * @param requestBody requestId, price
     * @return
     */
    @PostMapping("/request/price")
    public CustomResponse saveRequestPrice(@RequestBody Map<String, Object> requestBody) {
        chattingService.saveRequestPrice(
                Long.parseLong(requestBody.get("requestId").toString()),
                Integer.parseInt(requestBody.get("price").toString())
        );

        return new CustomResponse(200, "결제 금액 저장 성공");
    }

    /**
     * 플리 참여 정보 조회
     * @param chattingId 채팅 ID
     * @return fllyDto 플리 참여 정보
     */
    @GetMapping("/flly/{chattingId}")
    public CustomResponse getFllyInfo(@PathVariable Long chattingId) {
        FllyFromChattingDto.Participation fllyDto = chattingService.getParticipationInfo(chattingId);

        return new DataResponse<FllyFromChattingDto.Participation>(200, "플리 참여 정보 조회 성공", fllyDto);
    }

    /**
     * 플리 상세보기 조회
     * @param chattingId
     * @return participationDto, fllyDto
     */
    @GetMapping("/flly/detail/{chattingId}")
    public CustomResponse getFllyDetailInfo(@PathVariable Long chattingId) {
        FllyFromChattingDto.Participation participationDto = chattingService.getParticipationInfo(chattingId);
        FllyFromChattingDto.FllyInfo fllyDto = chattingService.getFllyInfo(chattingId);

        Map<String, Object> response = new HashMap<>();
        response.put("fllyDto", fllyDto);
        response.put("participationDto", participationDto);

        return new DataResponse<>(200, "플리 자세히 보기 조회 성공", response);
    }

    /**
     * 주문서 조회
     * @param chattingId
     * @return
     */
    @GetMapping("/request/{chattingId}")
    public CustomResponse getRequestInfo(@PathVariable Long chattingId) {
        RequestFromChattingDto requestDto = chattingService.getRequestInfo(chattingId);

        return new DataResponse<>(200, "주문서 조회 성공", requestDto);
    }

    /**
     * 결제 정보 조회
     * @param chattingId
     * return requestId, price, sellerName
     */
    @GetMapping("/price/{chattingId}")
    public CustomResponse getPrice(@PathVariable Long chattingId) {
        Map<String, Object> responseDto = chattingService.getPrice(chattingId);

        return new DataResponse<>(200, "결제 정보 조회 성공", responseDto);
    }

    /**
     * 채팅방 나가기
     * @param chattingId
     * @return
     */
    @DeleteMapping("/{chattingId}")
    public CustomResponse exitChatting(HttpServletRequest request, @PathVariable Long chattingId) {
        Long memberId = (Long) request.getAttribute("memberId");
//        Long memberId = 1L;
        chattingService.exitChatting(chattingId, memberId);

        return new CustomResponse(200, "채팅방 나가기 성공");
    }
}
