package com.ssafy.flowerly.config.auth.vo;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Map;
@Getter
public class CustomOAuth2User extends DefaultOAuth2User {

    private final Long userId;

    public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attributes,
                            String nameAttributeKey,
                            Long userId) {
        super(authorities, attributes, nameAttributeKey);
        this.userId = userId;
    }
}
