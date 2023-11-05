package com.ssafy.flowerly.config.auth.vo;

import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.member.MemberRole;
import com.ssafy.flowerly.member.SocialType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@AllArgsConstructor
public abstract class OAuth2UserInfo {
    // 각 API가 제공하는 유저에 대한 속성
    protected Map<String, Object> attributes;

    // 속성에서 필요한 정보를 가져오는 추상 메서드
    public abstract String getId();
    public abstract String getNickname();
    public abstract String getEmail();

    //유저 엔티티를 생성한다.
    public Member toEntity(String socialId, SocialType socialType){
        LocalDateTime now = LocalDateTime.now();
        return Member.builder()
                .socialId(socialId)
                .role(MemberRole.GUEST)
                .nickName(getNickname())
                .email(getEmail())
                .socialType(socialType)
                .isNotification(false)
                .build();
    }
}
