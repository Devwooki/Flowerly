package com.ssafy.flowerly.util;

import com.ssafy.flowerly.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    //Java RuntimeException을 발생시킬 때 쓰자
    @ExceptionHandler(IllegalArgumentException.class)
    public CustomResponse handleIllegalArgumentException(IllegalArgumentException e){
        return new CustomResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());

    }

    //CustomException을 발생시킬 때 쓰자
    public CustomResponse handleICustomException(CustomException e){
        return new CustomResponse(e.getErrorCode().getCode(), e.getMessage());

    }
}
