package com.ssafy.flowerly.buyer.controller;

import com.ssafy.flowerly.buyer.service.BuyerService;
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
import java.util.*;

@RestController
@RequestMapping("/api/buyer")
@Slf4j
@RequiredArgsConstructor
public class BuyerController {
    private final BuyerService buyerService;

    @GetMapping("/my-flly")
    public DataResponse<?> getMyFlly(HttpServletRequest request,
                                     @PageableDefault(size = 6) Pageable pageable){
        Long memberId = (Long) request.getAttribute("memberId");
        return new DataResponse<>(HttpStatus.OK.value(), "진행중인 flly를 반환합니다.", buyerService.getMyFlly(pageable, memberId));
    }
    @GetMapping("/flist/{fllyId}")
    public DataResponse<?> getFilst(HttpServletRequest request,
                                    @PathVariable Long fllyId){
        Long memberId = (Long) request.getAttribute("memberId");
        return new DataResponse<>(HttpStatus.OK.value(), "fllyId :  "+ fllyId+" 의 플리스트를 조회합니다.", buyerService.getFlist(Pageable.ofSize(6), fllyId));
    }

    @GetMapping("/flist-page/{fllyId}")
    public DataResponse<?> getFilstPage(HttpServletRequest request,
                                    @PageableDefault(size = 6) Pageable pageable,
                                    @PathVariable Long fllyId){

        Long memberId = (Long) request.getAttribute("memberId");
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("stores", buyerService.getParticipants(pageable, fllyId));
        return new DataResponse<>(HttpStatus.OK.value(), fllyId+" 의 "+ pageable.getOffset() + "페이지 플리스트 조회합니다.", responseData);
    }



}
