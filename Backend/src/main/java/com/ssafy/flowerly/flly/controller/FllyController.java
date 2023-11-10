package com.ssafy.flowerly.flly.controller;

import com.ssafy.flowerly.flly.dto.FllyDto;
import com.ssafy.flowerly.flly.dto.FlowerDto;
import com.ssafy.flowerly.flly.dto.FlowerRequestDto;
import com.ssafy.flowerly.flly.service.FllyService;
import com.ssafy.flowerly.flly.service.FlowerService;
import com.ssafy.flowerly.review.service.ReviewService;
import com.ssafy.flowerly.util.CustomResponse;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/flly")
@RequiredArgsConstructor
public class FllyController {

    private final FlowerService flowerService;
    private final FllyService fllyService;
    private final ReviewService reviewService;
    /**
     * 꽃 목록 조회 API
     * @param flowerRequest 사용자의 선택 정보
     * @return flowerList
     */
    @PostMapping
    public CustomResponse getFlowerList(@RequestBody FlowerRequestDto flowerRequest){
        log.info("꽃 목록 조회");
        Map<String, List<FlowerDto>> map = flowerService.getFlowerList(flowerRequest);
        return new DataResponse<>(200, "꽃 리스트 조회 성공", map);
    }

    /**
     * 의뢰서 저장 API
     * @param fllyDto 의뢰서 정보
     * @return flowerList
     */
    @PostMapping("/request")
    public CustomResponse saveFllyRequest(@RequestBody FllyDto fllyDto){
        log.info("의뢰서 저장");
        flowerService.saveFllyRequest(fllyDto);
        return new CustomResponse(200, "의뢰서 저장 성공");
    }


    @GetMapping("/store/{sellerId}")
    public DataResponse<?> getStoreInfo(HttpServletRequest request,
                                        Pageable pageable,
                                        @PathVariable Long sellerId){
        return new DataResponse<>(HttpStatus.SC_OK, "가게 정보를 반환합니다",  fllyService.getStoreDetail(pageable, sellerId));
    }
}
