package com.ssafy.flowerly.config.auth.vo;

import com.ssafy.flowerly.member.MemberRole;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Map;

/**
 * OAuth2UserService에서 기본적으로 반환되는 OAuth2User 객체에서 추가로 필요한 필드 추가한 것
 * @Param Email : 처음 로그인 할 경우(Resource Server가 정보를 제공하지 않는 경우) 내 서비스에서 정보를 받아야함
 *  - 어떤 유저가 OAuth를 쓴건지 알 수 없으므로
 *    OAuth로그인시 임시 email 생성 -> 회원 식별용 AccessToken으로 사용
 *    이후 OAuth2LoginSuccessHandler에서 해당 이메일로 Token 처리
 *
 * @Param Role : 처음 로그인 유저 ROLE_GUEST,
 *               추가 정보 입력 등 회원가입 ROLE_USER
 * SuccessHandler에서 추가 정보를 입력하는 URL로 리다이렉트 한다.
 *
 * =================================================================
 * 결론 : Resource Server에서 제공하지 않는 추가 정보들을 내 서비스에서 가지기 때문에 입력 받는다.
 * */
@Getter
public class CustomOAuth2User extends DefaultOAuth2User {

    private final Long memberId;
    private MemberRole role;

    public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attributes,
                            String nameAttributeKey,
                            Long memberId,
                            MemberRole memberRole) {
        super(authorities, attributes, nameAttributeKey);
        this.memberId = memberId;
        this.role = memberRole;
    }
}
