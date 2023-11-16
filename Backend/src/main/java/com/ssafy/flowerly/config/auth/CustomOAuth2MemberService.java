package com.ssafy.flowerly.config.auth;

import com.ssafy.flowerly.config.auth.vo.CustomOAuth2User;
import com.ssafy.flowerly.config.auth.vo.KakaoOAuth2UserInfo;
import com.ssafy.flowerly.config.auth.vo.OAuth2UserInfo;
import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.member.SocialType;
import com.ssafy.flowerly.member.model.MemberRepository;
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

    @Override // 소셜로그인 API 사용자 정보 제공 URI로 요청을 보내서 사용자의 정보를 얻는 메소드
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        //log.info("CustomOAuth2MemberService.loadUser() 실행 / OAuth2.0 로그인 요청 진입");

        // DefaultOAuth2UserService를 통해 DefaultOAuth2User 객체를 생성해서 반환한다.
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        //OAuth 서비스에서 가져온 유저 정보를 가짐
        OAuth2User oAuth2User = delegate.loadUser(userRequest);


        //OAuth 서비스 이름
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        //Social Type을 가져오지만, kakao만 사용하므로 생략한다.
        SocialType socialType = getSocialType(registrationId);
        //OAuth 로그인시 pk값
        String userNameAttributeName =  userRequest.getClientRegistration()
                                                    .getProviderDetails()
                                                    .getUserInfoEndpoint()
                                                    .getUserNameAttributeName();
        //log.info("registrationId : {}", registrationId);
        //log.info("socialType : {}", socialType);
        //log.info("userNameAttribute : {} ", userNameAttributeName);

        //socialType에 따라 유저 정보를 통해 OAuthAttribute 생성한다.
        OAuth2UserInfo oAuth2UserInfo = new KakaoOAuth2UserInfo(oAuth2User.getAttributes());


        Member member = saveOfFind(oAuth2UserInfo, socialType);
        //OAuth2User 기본 표현 OAuth 2.0 표준 사용자를 나타내며 이름, 이메일, 전화번호, 주소 처럼 하나이상의 속성으로 구성
        //OAuth2는 SNS 서비스간 표준화 되지 않아서 CustomOAuth2User를 만들어서 서비스 내부에서 표준화 처리한다.

        //DefaultOAuth2User를 구현한 CustomOAuth2User 반환
        // 성공할 경우 SuccessHandler
        // 실패한 경우 FailedHandler
        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRole().getKey())),
                oAuth2User.getAttributes(),
                userNameAttributeName,
                member.getMemberId(),
                member.getRole()
        );
    }

    private SocialType getSocialType(String registrationId){
        if("naver".equals(registrationId)) return SocialType.NAVER;
        if("kakao".equals(registrationId)) return SocialType.KAKAO;
        if("google".equals(registrationId)) return SocialType.GOOGLE;

        return SocialType.LOCAL;
    }

    //Email을 통해 정보 찾아옴. 있으면 업데이트, 없으면 생성
    /**
     * 없는 경우, 생성해도 SocialType, socialId, nickName, Email, role(Geust)만 있다.
     * */
    private Member saveOfFind(OAuth2UserInfo oAuth2UserInfo, SocialType socialType) {
        //kakaoI는 숫자가 랜덤하게 입력된 값이다. 이메일 아님에 주의
        String socialId = socialType.name() + "_" + oAuth2UserInfo.getId();

        return memberRepository.findBySocialId(socialId)
                //이메일이나 닉네임이 바뀔경우 업데이트 해주는 것
                .map(m -> {
                    //log.info("유저 정보가 있내");
                    return memberRepository.save(m.updateMail(oAuth2UserInfo.getEmail()));
                })//업데이트 하는 것
                //유저 정보가 없으면 생성한다.
                .orElseGet(()-> {
                    //log.info("유저 정보가 없네 만들어야징");
                    return memberRepository.save(oAuth2UserInfo.toEntity(socialId, socialType));//없으면 계정을 생성
                }
        );
    }
}
