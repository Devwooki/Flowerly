package com.ssafy.flowerly.member.vo;

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
    private String socialId;
    private String nickName;
    private String email;
    private boolean isNotification;
}
