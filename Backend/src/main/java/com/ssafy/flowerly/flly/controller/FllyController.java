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
import java.util.Map;

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
    public CustomResponse getFlowerList(@RequestBody FlowerRequestDto flowerRequest){
        log.info("꽃 목록 조회");
        Map<String, List<FlowerDto>> map = flowerService.getFlowerList(flowerRequest);
//        List<FlowerDto> flowerList = flowerService.getFlowerList(flowerRequest);
        return new DataResponse<>(200, "꽃 리스트 조회 성공 ", map);
    }

    // 선택 내용과 이미지 저장

    // 의뢰서 저장

//    /**
//     * 의미에 맞춘 꽃 목록 조회 API
//     * @param flowerRequest 상황, 대상
//     * @return flowerList
//     */
//    @PostMapping("/meaning")
//    public CustomResponse getFlowerListByMeaning(@RequestBody FlowerRequestDto flowerRequest){
//        log.info("의미 꽃 목록 조회");
//        List<FlowerDto> flowerList = flowerService.getFlowerListByMeaning(flowerRequest);
//        return new DataResponse<>(200, "의미 꽃 리스트 조회 성공 " + flowerList.size(), flowerList);
//    }
//
//    /**
//     * 색상에 맞춘 꽃 목록 조회 API
//     * @param flowerRequest 꽃 색상
//     * @return flowerList
//     */
//    @PostMapping("/color")
//    public CustomResponse getFlowerListByColor(@RequestBody FlowerRequestDto flowerRequest){
//        log.info("색상 꽃 목록 조회");
//        List<FlowerDto> flowerList = flowerService.getFlowerListByColor(flowerRequest);
//        return new DataResponse<>(200, "색상 꽃 리스트 조회 성공 " + flowerList.size(), flowerList);
//    }

}
