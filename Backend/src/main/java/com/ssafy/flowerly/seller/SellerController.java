package com.ssafy.flowerly.seller;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.seller.model.SellerService;
import com.ssafy.flowerly.seller.vo.FllyRequestDto;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/seller")
public class SellerController {

    private final SellerService sellerService;
    private final JWTService jwtService;

    @GetMapping("/flly")
    public DataResponse<Map<Object, Object>> sellerFllyList(HttpServletRequest request){

        //Long memberId = Long.valueOf(request.getHeader(jwtService.getAccessHeader()));

        return null;
    }

    @GetMapping("/request/{fllyId}")
    public DataResponse<FllyRequestDto> sellerRequest(@PathVariable("fllyId") long fllyId, HttpServletRequest request){

        log.info(Long.toString(fllyId));
        FllyRequestDto fllyInfo = sellerService.getRequestLetter(fllyId);
        DataResponse<FllyRequestDto> result = new DataResponse<>(200, "데이터 반환 성공" ,fllyInfo);

        return result;
    }

    
}
