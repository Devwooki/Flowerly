package com.ssafy.flowerly.exception;

import lombok.Getter;

@Getter
public class AuthException extends RuntimeException{
    private int value;
    private String message;
    public AuthException(int value, String message) {
        this.value = value;
        this.message = message;
    }
}
