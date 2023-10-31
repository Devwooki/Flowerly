package com.ssafy.flowerly.seller;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.seller.model.SellerService;
import com.ssafy.flowerly.seller.vo.FllyRequestDto;
import com.ssafy.flowerly.seller.vo.OrderParticipationDto;
import com.ssafy.flowerly.seller.vo.OrderSelectSimpleDto;
import com.ssafy.flowerly.seller.vo.ParticipationRequestDto;
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


    /*
      의뢰 내용 API
   */
    @GetMapping("/request/{fllyId}")
    public DataResponse<FllyRequestDto> sellerRequest(@PathVariable("fllyId") long fllyId, HttpServletRequest request){

        log.info(Long.toString(fllyId));
        FllyRequestDto fllyInfo = sellerService.getRequestLetter(fllyId);
        DataResponse<FllyRequestDto> result = new DataResponse<>(200, "데이터 반환 성공" ,fllyInfo);

        return result;
    }


      /*
        채택된 주문 리스트
     */

    @GetMapping("/order")
    public DataResponse<Page<OrderSelectSimpleDto>> sellerOrderSelect(HttpServletRequest request, @PageableDefault(size = 10) Pageable pageable){

        Long memberId = Long.valueOf(1);
        Page<OrderSelectSimpleDto> orderSelectList = sellerService.getOrderSelect(memberId, pageable);

        DataResponse<Page<OrderSelectSimpleDto>> result = new DataResponse<>(200, "채택 리스트반환 성공 ",orderSelectList );

        return result;

    }


    /*
      채택된 주문 완료하기
   */
    @PatchMapping("/flly/update/{fllyId}")
    public DataResponse<Map<String,Object>> fllyUpdateProgressType(HttpServletRequest request, @PathVariable("fllyId") long fllyId){
        Map<String, Object> temp = new HashMap<>();
        Long memberId = Long.valueOf(1);
        String updateProgress = sellerService.UpdateProgressType(memberId, fllyId);
        temp.put("fllyUpdateProgress", updateProgress);

        DataResponse<Map<String,Object>> result = new DataResponse<>(200, "플리상태 변경 완료", temp);
        return result;
    }


    /*
       참여한 플리
    */
    @GetMapping("/flly/seller")
    public DataResponse<Page<OrderParticipationDto>> fllyParticipationList(HttpServletRequest request, @PageableDefault(size = 10) Pageable pageable){
        Long memberId = Long.valueOf(1);

        Page<OrderParticipationDto> participationList = sellerService.getParticipation(memberId, pageable);

        DataResponse<Page<OrderParticipationDto>> result = new DataResponse<>(200, "참여한 플리목록 반환 성공 ", participationList);
        return result;

    }

    /*
        참여한 플리 상세보기 ( 의뢰 내용 + 제안 내용 )
     */
    @GetMapping("/flly/request/{fllyId}")
    public DataResponse<ParticipationRequestDto> getFllyRequestInfo(HttpServletRequest request, @PathVariable("fllyId") long fllyId){
        Long memberId = Long.valueOf(1);
        ParticipationRequestDto participationRequestDto = sellerService.getFllyRequestInfo(memberId, fllyId);
        log.info(participationRequestDto.toString());
        DataResponse<ParticipationRequestDto> result = new DataResponse<>(200, "참여한 플리상제(제안+의뢰) 반환 성공 ", participationRequestDto);
        return result;
    }
}
