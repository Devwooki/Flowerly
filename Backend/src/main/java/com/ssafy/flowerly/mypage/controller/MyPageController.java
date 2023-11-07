package com.ssafy.flowerly.mypage.controller;


import com.ssafy.flowerly.mypage.dto.NickNameUpdateDto;
import com.ssafy.flowerly.mypage.service.MyPageService;
import com.ssafy.flowerly.util.CustomResponse;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;


    // 마이페이지 첫화면 - buyer
    @GetMapping("/buyer")
    public CustomResponse getNickName(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");


        return new DataResponse<>(200, "닉네임 조회 성공", myPageService.getNickName(memberId));
    }

    // buyer 닉네임 수정
    @PutMapping("/nickname")
    public CustomResponse updateNickName(HttpServletRequest request, @RequestBody NickNameUpdateDto nickNameUpdateDto) {
        Long memberId = (Long) request.getAttribute("memberId");
        String newNickName = nickNameUpdateDto.getNickname();

        return new DataResponse<>(200, "닉네임 수정 성공", myPageService.updateNickName(memberId, newNickName));
    }

    // notification 수정
    @PutMapping
    public CustomResponse updateNotification(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        String newNotificationStatus = (String) myPageService.updateNotification(memberId);

        return new DataResponse<>(200, "알림 상태 변경 성공", newNotificationStatus);
    }

}
