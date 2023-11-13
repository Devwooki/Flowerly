package com.ssafy.flowerly.flly.controller;

import com.ssafy.flowerly.flly.service.FllyService;
import com.ssafy.flowerly.flly.service.FlowerService;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MainController {
    private final FlowerService flowerService;
    @GetMapping("/main")
    public DataResponse<?> getStoreInfo(){
        return new DataResponse<>(HttpStatus.SC_OK, "제철 꽃 정보를 반환합니다", flowerService.getMainImages());
    }
}
