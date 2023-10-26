package com.ssafy.flowerly.config.auth;

import com.ssafy.flowerly.config.auth.vo.CustomOAuth2User;
import com.ssafy.flowerly.config.auth.vo.KakaoOAuth2UserInfo;
import com.ssafy.flowerly.config.auth.vo.OAuth2UserInfo;
import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class CustomOAuth2MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;
    //private final CustomAuthorityUtils authorityUtils;

    @Override //Security가 accesstoken을 이용해 OAuth2 Server에서 가져온 정보를 통해 유저 정보를 가져옴
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);//OAuth 서비스에서 가져온 유저 정보를 가짐

        //OAuth 서비스 이름
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        //OAuth 로그인시 pk값
        String userNameAttributeName =  userRequest.getClientRegistration()
                                                    .getProviderDetails()
                                                    .getUserInfoEndpoint()
                                                    .getUserNameAttributeName();

        OAuth2UserInfo oAuth2UserInfo = new KakaoOAuth2UserInfo(oAuth2User.getAttributes());

        Member member = saveOfFind(oAuth2UserInfo);

        //OAuth2User 기본 표현 OAuth 2.0 표준 사용자를 나타내며 이름, 이메일, 전화번호, 주소 처럼 하나이상의 속성으로 구성
        //OAuth2는 SNS 서비스간 표준화 되지 않아서 CustomOAuth2User를 만들어서 서비스 내부에서 표준화 처리한다.

        //customAttribute를 반환하는 이유는 OAuth2에서 받은 정보는 unmodifiedMap이라서 수정을 필요로함
        return new CustomOAuth2User(Collections.singleton(new SimpleGrantedAuthority(member.getRole().getKey())),
                                    oAuth2User.getAttributes(), userNameAttributeName, member.getId());
    }

    //Email을 통해 정보 찾아옴. 있으면 업데이트, 없으면 삭제
    private Member saveOfFind(OAuth2UserInfo oAuth2UserInfo) {
        String kakaoId = oAuth2UserInfo.getId();

        return memberRepository.findByKakaoId(kakaoId)
                .map(m -> m.updateNicknameAndMail(oAuth2UserInfo.getNickname(), oAuth2UserInfo.getEmail()))//업데이트 하는 것
                .orElseGet(()-> memberRepository.save(oAuth2UserInfo.toEntity(kakaoId))//없으면 계정을 생성
        );
    }
}
