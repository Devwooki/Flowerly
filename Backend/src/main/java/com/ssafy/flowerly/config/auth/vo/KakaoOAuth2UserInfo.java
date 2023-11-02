package com.ssafy.flowerly.config.auth.vo;

import com.ssafy.flowerly.config.auth.vo.OAuth2UserInfo;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {
    /** 카카오 OAuth 예시
     * <kakao>
     * {
     *     id=2632890179,
     *     connected_at=2023-01-22T08:17:54Z,
     *     properties = {nickname=안창범},
     *     kakao_account = {
     *         profile_nickname_needs_agreement=false,
     *         profile={nickname=안창범},
     *         has_email=true,
     *         email_needs_agreement=false,
     *         is_email_valid=true,
     *         is_email_verified=true,
     *         email=chb2005@naver.com
     *     }
     * }
     * */
    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return String.valueOf((Long)attributes.get("id"));
    }

    @Override
    public String getNickname() {
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) account.get("profile");

        //account가 null이거나 유저 정보를 찾았는데 프로필이 없는 경우 null 반환 -> 계정 생성
        if (account == null || profile == null) return null;

        return (String) profile.get("nickname");
    }

    @Override
    public String getEmail() {
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        boolean hasEmail = (boolean) account.get("has_email");

        if (account == null || !hasEmail) return null;

        String email = (String) account.get("email");
        if(email.contains("http")) email = email.replace("http", "https");

        return (String) account.get("email");
    }
}
