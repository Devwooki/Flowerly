package com.ssafy.flowerly.review.dtos;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDetailDto {
    private String consumerNickName;
    private String content;
    private LocalDateTime createdAt;
}
