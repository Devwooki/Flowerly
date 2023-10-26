package com.ssafy.flowerly.controller;

import com.ssafy.flowerly.util.CustomResponse;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/test")
    public CustomResponse test(){
        return new CustomResponse(HttpStatus.OK.value(), "테스트 성공");
        //oauth2.0 부터는 client인증 정보만 필요로 함
    }
}
