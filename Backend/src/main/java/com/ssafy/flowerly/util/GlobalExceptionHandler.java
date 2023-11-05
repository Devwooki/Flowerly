package com.ssafy.flowerly.util;

import com.ssafy.flowerly.exception.AuthException;
import com.ssafy.flowerly.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    //Java RuntimeException을 발생시킬 때 쓰자
    @ExceptionHandler(IllegalArgumentException.class)
    public CustomResponse handleIllegalArgumentException(IllegalArgumentException e){
        return new CustomResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());

    }

    @ExceptionHandler(IOException.class)
    public CustomResponse handleIOException(IOException e){
        return new CustomResponse(HttpStatus.BAD_REQUEST.value(), "파일 업로드 실패" + e.getMessage());

    }

    //CustomException을 발생시킬 때 쓰자
    @ExceptionHandler(CustomException.class)
    public CustomResponse handleICustomException(CustomException e){
        return new CustomResponse(e.getErrorCode().getCode(), e.getMessage());

    }

    //계정 접속 예외 발생
    @ExceptionHandler(AuthException.class)
    public CustomResponse handleICustomException(AuthException e){
        return new CustomResponse(e.getErrorCode().getCode(), e.getErrorCode().getMessage());

    }
}
