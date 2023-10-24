package com.ssafy.flowerly.util;

import org.springframework.http.ResponseEntity;

public class CustomResponse{
    private int code;
    private String message;

    public CustomResponse(int code, String message ) {
        this.code = code;
        this.message = message;
    }
}
