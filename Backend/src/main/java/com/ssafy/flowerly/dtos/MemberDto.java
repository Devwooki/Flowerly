package com.ssafy.flowerly.dtos;

import lombok.*;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDto {
    private Long id;
    private String kakaoId;
    private String nickName;
    private boolean isNotification;
}
