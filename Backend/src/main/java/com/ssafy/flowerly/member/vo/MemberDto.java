package com.ssafy.flowerly.member.vo;

import com.ssafy.flowerly.member.MemberRole;
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
    private MemberRole role;
    private boolean isNotification;

    private StoreInfoDto store;
}
