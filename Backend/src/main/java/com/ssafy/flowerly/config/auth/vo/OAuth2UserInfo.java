package com.ssafy.flowerly.config.auth.vo;

import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.enums.MemberRole;
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
    public Member toEntity(String kakaoId){
        LocalDateTime now = LocalDateTime.now();
        return Member.builder()
                .kakaoId(kakaoId)
                .role(MemberRole.USER)
                .nickName(getNickname())
                .isRemoved(false)
                .isNotification(true)
                .createdAt(now)
                .updateddAt(now)
                .build();
    }

    /* private Long id;

    @Column(nullable = false)
    private String kakaoId;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @Column(nullable = false)
    private String nickName;

    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime updateddAt;

    @Column(nullable = false)
    private boolean isRemoved;

    @Column(nullable = false)
    private boolean isNotification;*/
}
