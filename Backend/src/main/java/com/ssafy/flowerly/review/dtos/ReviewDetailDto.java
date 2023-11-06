package com.ssafy.flowerly.review.dtos;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDetailDto {
    private String writer;
    private String content;
    private LocalDateTime writetime;
}
