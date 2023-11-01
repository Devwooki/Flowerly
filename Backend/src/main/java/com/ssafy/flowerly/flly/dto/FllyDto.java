package com.ssafy.flowerly.flly.dto;

import com.ssafy.flowerly.entity.Flower;
import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.entity.type.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

public class FllyDto {
    // 받는 정보

    // 의뢰인?? 닉네임?
    // 의뢰서 작성 전
    private String imageUrl;
    private SituationType situation;
    private TargetType target;
    private List<String> colors;
    private List<Flower> flowers;


    // 의뢰서 작성 후
    private OrderType orderType;
    private String requestContent;
    private Integer budget;
    private LocalDateTime deadline;
    // ++++ 주소
}
