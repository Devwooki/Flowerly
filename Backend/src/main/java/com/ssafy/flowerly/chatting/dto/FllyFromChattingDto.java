package com.ssafy.flowerly.chatting.dto;

import com.ssafy.flowerly.entity.Flly;
import com.ssafy.flowerly.entity.FllyParticipation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class FllyFromChattingDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Participation {
//        private Long fllyId;
        private String buyerNickname;
        private Integer offerPrice;
        private String content;
        private String imageUrl;

        public static Participation of(String buyerNickname, FllyParticipation flly) {
            return Participation.builder()
//                    .fllyId(flly.getFlly().getFllyId())
                    .buyerNickname(buyerNickname)
                    .offerPrice(flly.getOfferPrice())
                    .content(flly.getContent())
                    .imageUrl(flly.getImageUrl())
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class FllyInfo {
        private String buyerNickname;
        private String situation;
        private String target;
        private String[] colors;
        private String[] flowers;
        private Integer budget;
        private String deadline;
        private String orderType;
        private String address;
        private String requestContent;

        public static FllyInfo of(Flly flly) {
            List<String> colors = new ArrayList<>();
            if(flly.getColor1() != null) colors.add(flly.getColor1().getTitle());
            if(flly.getColor2() != null) colors.add(flly.getColor2().getTitle());
            if(flly.getColor3() != null) colors.add(flly.getColor3().getTitle());

            List<String> flowers = new ArrayList<>();
            if(flly.getFlower1() != null) flowers.add(flly.getFlower1().getFlowerName());
            if(flly.getFlower2() != null) flowers.add(flly.getFlower2().getFlowerName());
            if(flly.getFlower3() != null) flowers.add(flly.getFlower3().getFlowerName());

            return FllyInfo.builder()
                    .buyerNickname(flly.getConsumer().getNickName())
                    .situation(flly.getSituation().toString())
                    .target(flly.getTarget().toString())
                    .colors(colors.toArray(new String[colors.size()]))
                    .flowers(flowers.toArray(new String[flowers.size()]))
                    .budget(flly.getBudget())
                    .deadline(flly.getDeadline().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm")))
                    .orderType(flly.getOrderType().getTitle())
                    .requestContent(flly.getRequestContent())
                    .build();
        }

        public void setAddress(String address) {
            this.address = address;
        }
    }

}
