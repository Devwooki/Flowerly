package com.ssafy.flowerly.config.auth.handler;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.config.auth.vo.CustomOAuth2User;
import com.ssafy.flowerly.member.MemberRole;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${url.test}")
    private String redirectURL;
    private final JWTService jwtService;
    private final OAuth2AuthorizedClientService authorizedClientService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                oauthToken.getAuthorizedClientRegistrationId(), oauthToken.getName());

        OAuth2AccessToken oauth2Token = authorizedClient.getAccessToken();
        log.info("OAuth2.0 성공!!!");
        try{
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            log.info("{}의 role {}", oAuth2User.getMemberId(), oAuth2User.getRole() );
            //getPrincipal()로 얻은 Member정보가 GEUST인 경우 처음 요청 -> 정보 입력 페이지로 리다이렉트 한다.
            if(oAuth2User.getRole() == MemberRole.GUEST){
                String accessToken = jwtService.createAccessToken(oAuth2User.getMemberId());
                response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
                response.sendRedirect("oauth2/sign-up"); //프론트 회원가입 후 추가 정보 입력 창으로 리다이렉트

                jwtService.sendAccessTokenAndRefreshToken(response, accessToken, null);
            }else{
                log.info("계정이 있으니 정보를 업데이트 한다");
                loginSuccess(response, oAuth2User);
            }
        }catch (Exception e){
            log.error("OAuth2.0 에러 발생!");
            e.printStackTrace();
        }
    }

    // 추후 과제 : 소설 로그인 시, 무조건 토큰 생성이 아닌 JWT필터링 처럼 RefreshToken 유무에 따라 다르게 처리한다.
    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        log.info("로그인 성공!");
        String accessToken = jwtService.createAccessToken(oAuth2User.getMemberId());
        String refreshToken = jwtService.createRefreshToken(oAuth2User.getMemberId());
        jwtService.sendAccessTokenAndRefreshToken(response, accessToken, refreshToken);

        response.sendRedirect(redirectURL + "/temp");
    }
}
