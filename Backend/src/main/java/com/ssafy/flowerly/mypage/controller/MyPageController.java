package com.ssafy.flowerly.mypage.controller;


import com.ssafy.flowerly.mypage.dto.NickNameUpdateDto;
import com.ssafy.flowerly.mypage.dto.StoreMyPageDto;
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

    // seller 플리 내역

    @GetMapping("/seller/flly")
    public CustomResponse getSellerFlly(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        return new DataResponse<>(200, "판매자 플리 내역 조회 성공", myPageService.getSellerFlly(memberId));
    }


    // Buyer 플리 내역

    @GetMapping("/buyer/flly")
    public CustomResponse getBuyerFlly(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        return new DataResponse<>(200, "구매자 플리 내역 조회 성공", myPageService.getBuyerFlly(memberId));
    }

    // 마이페이지 첫화면 - buyer
    @GetMapping("/buyer")
    public CustomResponse getNickName(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");


        return new DataResponse<>(200, "닉네임 조회 성공", myPageService.getNickName(memberId));
    }

    // 마이페이지 첫 화면 - seller
    @GetMapping("/seller")
    public CustomResponse getStoreNameAndImg(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        StoreMyPageDto storeMyPageInfo = myPageService.getStoreNameAndImg(memberId);

        return new DataResponse<>(200, "가게 마이페이지 정보 조회 성공", storeMyPageInfo );
    }



    // buyer 닉네임 수정
    @PutMapping("/nickname")
    public CustomResponse updateNickName(HttpServletRequest request, @RequestBody NickNameUpdateDto nickNameUpdateDto) {
        Long memberId = (Long) request.getAttribute("memberId");
        String newNickName = nickNameUpdateDto.getNickname();

        return new DataResponse<>(200, "닉네임 수정 성공", myPageService.updateNickName(memberId, newNickName));
    }

    // notification 수정
    @PutMapping("/notification")
    public CustomResponse updateNotification(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        String newNotificationStatus = (String) myPageService.updateNotification(memberId);

        return new DataResponse<>(200, "알림 상태 변경 성공", newNotificationStatus);
    }

}
