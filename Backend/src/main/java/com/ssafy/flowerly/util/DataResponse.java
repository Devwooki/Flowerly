package com.ssafy.flowerly.util;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DataResponse<T> extends CustomResponse{
    private T data;

    public DataResponse(int code, String message, T data) {
        super(code, message);
        this.data = data;
    }
}
