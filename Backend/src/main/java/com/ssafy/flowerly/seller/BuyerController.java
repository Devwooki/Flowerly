package com.ssafy.flowerly.seller;

import com.ssafy.flowerly.seller.model.BuyerService;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/buyer")
@Slf4j
@RequiredArgsConstructor
public class BuyerController {
    private final BuyerService buyerService;

    @GetMapping("/consumer")
    public DataResponse<?> getMyFlly(HttpServletRequest request){
        Long memberId = request.getDateHeader("memberId");

        return new DataResponse<>(HttpStatus.OK.value(), "진행중인 flly를 반환합니다.", buyerService.getMyFlly(memberId));
    }
}
