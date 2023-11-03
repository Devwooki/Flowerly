package com.ssafy.flowerly.member.vo;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class MemberDto {
    private Long id;
    private String socialId;
    private String nickName;
    private String email;
    private boolean isNotification;

    private StoreInfoDto store;
}
