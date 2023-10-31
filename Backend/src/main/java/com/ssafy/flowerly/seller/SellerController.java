package com.ssafy.flowerly.seller;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.seller.model.SellerService;
import com.ssafy.flowerly.seller.vo.FllyRequestDto;
import com.ssafy.flowerly.seller.vo.OrderSelectSimpleDto;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
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

    @GetMapping("/order")
    public DataResponse<Page<OrderSelectSimpleDto>> sellerOrderSelect(HttpServletRequest request, @PageableDefault(size = 10) Pageable pageable){

        Long mamberId = Long.valueOf(1);
        Page<OrderSelectSimpleDto> orderSelectList = sellerService.getOrderSelect(mamberId, pageable);

        DataResponse<Page<OrderSelectSimpleDto>> result = new DataResponse<>(200, "채택 리스트반환 성공 ",orderSelectList );

        return result;

    }

    @PatchMapping("/flly/update/{fllyId}")
    public DataResponse<Map<String,Object>> fllyUpdateProgressType(HttpServletRequest request, @PathVariable("fllyId") long fllyId){
        Map<String, Object> temp = new HashMap<>();
        Long mamberId = Long.valueOf(1);
        String updateProgress = sellerService.UpdateProgressType(mamberId, fllyId);

        DataResponse<Map<String,Object>> result = new DataResponse<>(200, "채택 리스트반환 성공 ", temp);
        return result;
    }

    
}
