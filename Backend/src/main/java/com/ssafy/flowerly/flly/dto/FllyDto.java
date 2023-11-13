package com.ssafy.flowerly.flly.dto;

import com.ssafy.flowerly.entity.Flower;
import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.entity.type.*;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FllyDto {
    private String imageUrl;
    private SituationType situation;
    private TargetType target;
    private List<String> colors;
    private List<FlowerDto> flowers;

    private OrderType orderType;
    private String requestContent;
    private Integer budget;
    private LocalDateTime deadline;

    private List<FllyDto.Pickup> pickup;
    private FllyDto.Delivery delivery;
    private String detailAddress;

    // ++++ 주소
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString()
    public static class Pickup {
        private Long sidoCode;
        private Long sigunguCode;
        private Long dongCode;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString()
    public static class Delivery {
        private String sido;
        private String sigungu;
        private String dong;
    }

}
