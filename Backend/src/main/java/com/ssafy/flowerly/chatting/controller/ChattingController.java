package com.ssafy.flowerly.chatting.controller;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.chatting.dto.ChattingDto;
import com.ssafy.flowerly.chatting.dto.ChattingMessageDto;
import com.ssafy.flowerly.chatting.service.ChattingService;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.util.CustomResponse;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/chatting")
@RequiredArgsConstructor
public class ChattingController {

    private final JWTService jwtService;
    private final ChattingService chattingService;

    /**
     * 채팅방 목록 조회 API
     * @param request 로그인한 유저의 id 추출
     * @return chattingList
     */
    @GetMapping
    public CustomResponse getChattingList(HttpServletRequest request){
        log.info("채팅방 목록 조회");
        Long memberId = jwtService.extractMemberId(
                jwtService.extractAccessToken(request)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_ACCESS_TOKEN))
            ).orElseThrow(() -> new CustomException(ErrorCode.INVALID_ACCESS_TOKEN));
//        System.out.println(memberId);
        List<ChattingDto.BasicResponse> chattingList = chattingService.getChattingList(memberId);

        return new DataResponse<>(200, "채팅방 리스트 조회 성공", chattingList);
    }

    /**
     * 채팅방의 메세지 목록 조회
     * @param request 로그인한 유저의 id 추출
     * @param chattingId 조회할 채팅방 id
     * @return
     */
    @GetMapping("/{chattingId}")
    public CustomResponse getChattingMessageList(HttpServletRequest request, @PathVariable Long chattingId) {
        log.info(chattingId + "번 채팅방 조회");
        Long memberId = jwtService.extractMemberId(
                jwtService.extractAccessToken(request)
                        .orElseThrow(() -> new CustomException(ErrorCode.INVALID_ACCESS_TOKEN))
        ).orElseThrow(() -> new CustomException(ErrorCode.INVALID_ACCESS_TOKEN));

        ChattingDto.RoomResponse chattingRoom = chattingService.getChattingMessageList(memberId, chattingId);

        return new DataResponse<>(200, "채팅방 메세지 조회 성공", chattingRoom);
    }

//    @PostMapping("/message")
//    public CustomResponse saveChattingMessage(@RequestBody ChattingMessageDto.Request message) {
//        chattingService.saveChattingMessage(message);
//
//        return new CustomResponse(200, "채팅 메세지 저장 성공");
//    }

}
