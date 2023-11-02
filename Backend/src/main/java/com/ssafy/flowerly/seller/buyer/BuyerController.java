package com.ssafy.flowerly.seller.buyer;

import com.ssafy.flowerly.seller.buyer.BuyerService;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/buyer")
@Slf4j
@RequiredArgsConstructor
public class BuyerController {
    private final BuyerService buyerService;

    @GetMapping("/my-flly")
    public DataResponse<?> getMyFlly(HttpServletRequest request,
                                     @PageableDefault(size = 6) Pageable pageable){
        //Long memberId = request.getDateHeader("memberId");
        Long memberId = 1L;

        return new DataResponse<>(HttpStatus.OK.value(), "진행중인 flly를 반환합니다.", buyerService.getMyFlly(pageable, memberId));
    }
    @GetMapping("/flist/{flistId}")
    public DataResponse<?> getFilst(HttpServletRequest request,
                                    @PageableDefault(size = 6) Pageable pageable,
                                    @PathVariable Long fllyId){
        //Long memberId = request.getDateHeader("memberId");
        Long memberId = 1L;
        return new DataResponse<>(HttpStatus.OK.value(), "flly의 플리스트를 조회합니다.", buyerService.getFlist(pageable, memberId, fllyId));
    }
}
