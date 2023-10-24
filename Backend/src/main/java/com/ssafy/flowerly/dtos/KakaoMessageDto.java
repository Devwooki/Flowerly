package com.ssafy.flowerly.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoMessageDto {
    private String objType;
    private String text;
    private String webUrl;
    private String mobileUrl;
    private String btnTitle;
}
