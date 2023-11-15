package com.ssafy.flowerly.seller;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.seller.model.SellerService;
import com.ssafy.flowerly.seller.vo.*;
import com.ssafy.flowerly.util.CustomResponse;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
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

        Long memberId = (Long) request.getAttribute("memberId");
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
        Long memberId = (Long) request.getAttribute("memberId");
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
        Long memberId = (Long) request.getAttribute("memberId");

        Page<OrderParticipationDto> participationList = sellerService.getParticipation(memberId, pageable);

        DataResponse<Page<OrderParticipationDto>> result = new DataResponse<>(200, "참여한 플리목록 반환 성공 ", participationList);
        return result;

    }

    /*
        플리 상세보기 ( 의뢰 내용 + 제안 내용 ) - 판매자 (참여한 / 주문서에서 이동)
     */
    @GetMapping("/flly/request/{fllyId}")
    public DataResponse<ParticipationRequestDto> getFllyRequestInfo(HttpServletRequest request, @PathVariable("fllyId") long fllyId){
        Long memberId = (Long) request.getAttribute("memberId");
        ParticipationRequestDto participationRequestDto = sellerService.getFllyRequestInfo(memberId, fllyId);
        DataResponse<ParticipationRequestDto> result = new DataResponse<>(200, "플리상제(제안+의뢰) 반환 성공 ", participationRequestDto);
        return result;
    }
    /*
        플리 상세보기 ( 의뢰 내용 + 제안 내용 ) - 구매자 (주문서에서 이동)
     */
    @GetMapping("/flly/request/buyer/{fllyId}")
    public DataResponse<ParticipationRequestDto> getFllyBuyerRequestInfo(HttpServletRequest request, @PathVariable("fllyId") long fllyId){
        Long memberId = (Long) request.getAttribute("memberId");
        ParticipationRequestDto participationRequestDto = sellerService.getFllyBuyerRequestInfo(memberId, fllyId);
        DataResponse<ParticipationRequestDto> result = new DataResponse<>(200, "플리상제(제안+의뢰) 반환 성공 ", participationRequestDto);
        return result;
    }

    /*
        플리 참여하기
     */
    @PostMapping("/flly/participate")
    public CustomResponse sellerFllyParticipate(HttpServletRequest request,
                                                @RequestPart("file") MultipartFile file,
                                                 RequestFllyParticipateDto data ){
        Long memberId = (Long) request.getAttribute("memberId");
        sellerService.sellerFllyParticipate(memberId, file, data);

        CustomResponse resulet = new CustomResponse(200, "참여 완료!");
        return resulet;
    }

    /*
        주변 플리 보기 배달
     */
    @GetMapping("/near/delivery")
    public DataResponse<Page<FllyNearDto>> getNearFllyDeliveryList(HttpServletRequest request,
                                                            @PageableDefault(size=10) Pageable pageable){

        Long memberId = (Long) request.getAttribute("memberId");
        Page<FllyNearDto> nearFllyList = sellerService.getNearFllyDeliverylist(memberId, pageable);
        DataResponse<Page<FllyNearDto>> result = new DataResponse<>(200, "근처 플리 요청성공", nearFllyList);

        return result;
    }
    /*
        까까운 플리 내역 픽업
     */
    @GetMapping("/near/pickup")
    public DataResponse<Page<FllyNearDto>> getNearFllyPickupList(HttpServletRequest request,
                                                                       @PageableDefault(size=10) Pageable pageable){

        Long memberId = (Long) request.getAttribute("memberId");
        Page<FllyNearDto> nearFllyList = sellerService.getNearFllyPickuplist(memberId, pageable);
        DataResponse<Page<FllyNearDto>> result = new DataResponse<>(200, "근처 플리 요청성공", nearFllyList);

        return result;
    }
    /*
        플리 주문서 
     */
    @GetMapping("/flly/order/{fllyId}")
    public DataResponse<Map<String,Object>> getFllyOrder(HttpServletRequest request, @PathVariable("fllyId") long fllyId){

        Long memberId = (Long) request.getAttribute("memberId");
        Map<String, Object> order = sellerService.getFllyOrder(memberId, fllyId);

        DataResponse<Map<String,Object>> result = new DataResponse<>(200, "주문서 반환 성공", order);

        return result;
    }

}
