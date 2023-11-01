package com.ssafy.flowerly.flly.controller;

import com.ssafy.flowerly.flly.dto.FlowerDto;
import com.ssafy.flowerly.flly.dto.FlowerRequestDto;
import com.ssafy.flowerly.flly.service.FlowerService;
import com.ssafy.flowerly.util.CustomResponse;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/flly")
@RequiredArgsConstructor
public class FllyController {

    private final FlowerService flowerService;

    /**
     * 꽃 목록 조회 API
     * @param flowerRequest 사용자의 선택 정보
     * @return flowerList
     */
    @PostMapping
    public CustomResponse getChattingList(@RequestBody FlowerRequestDto flowerRequest){
        log.info("꽃 목록 조회");
        List<FlowerDto> flowerList = flowerService.getFlowerList(flowerRequest);
        return new DataResponse<>(200, "채팅방 리스트 조회 성공", flowerList);
    }

    // 선택 내용과 이미지 저장

    // 의뢰서 저장

}
