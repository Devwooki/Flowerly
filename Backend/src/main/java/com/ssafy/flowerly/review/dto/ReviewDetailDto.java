package com.ssafy.flowerly.review.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDetailDto {
    private Long reviewId;
    private String consumerNickName;
    private String content;
    private String createdAt;
}
