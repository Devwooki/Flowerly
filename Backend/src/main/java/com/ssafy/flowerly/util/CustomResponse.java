package com.ssafy.flowerly.util;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@Builder
public class CustomResponse{
    private int code;
    private String message;

    public CustomResponse(int code, String message ) {
        this.code = code;
        this.message = message;
    }
}
