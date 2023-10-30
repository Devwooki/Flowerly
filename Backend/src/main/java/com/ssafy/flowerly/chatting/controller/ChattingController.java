package com.ssafy.flowerly.chatting.controller;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.chatting.dto.ChattingDto;
import com.ssafy.flowerly.chatting.service.ChattingService;
import com.ssafy.flowerly.util.CustomResponse;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController("/api/chatting")
@RequiredArgsConstructor
public class ChattingController {

    private final JWTService jwtService;
    private final ChattingService chattingService;

    /**
     * 채팅방 목록 조회 API
     * @param request 로그인한 유저의 id를 뽑기
     * @return chattingList
     */
    @GetMapping("/")
    public CustomResponse getChattingList(HttpServletRequest request){
        log.info("채팅방 리스트");
        Long memberId = Long.valueOf(request.getHeader(jwtService.getAccessHeader()));
        List<ChattingDto> chattingList = chattingService.getChattingList(memberId);

        return new DataResponse<>(200, "채팅방 리스트 조회 성공", chattingList);
    }
}
