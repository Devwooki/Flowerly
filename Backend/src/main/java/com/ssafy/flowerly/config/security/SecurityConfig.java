package com.ssafy.flowerly.config.security;

import com.ssafy.flowerly.config.auth.CustomOAuth2MemberService;
import com.ssafy.flowerly.config.auth.handler.OAuth2LoginFailureHandler;
import com.ssafy.flowerly.config.auth.handler.OAuth2LoginSuccessHandler;
import com.ssafy.flowerly.enums.MemberRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final CustomOAuth2MemberService customOAuth2MemberService;

    //reference https://github.com/wlwlsus/shabit/blob/main/SHabit-back/src/main/java/com/ezpz/shabit/config/security/WebSecurityConfig.java#L60

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //Cors 설정
        http.cors().configurationSource(corsConfigurationSource());

        //Spring Security 설정
        http.httpBasic().disable()
                .formLogin().disable()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests().antMatchers("/**").permitAll()
                .antMatchers(HttpMethod.GET).permitAll();

        //Oauth 설정
        http.oauth2Login()
                .loginPage("https://flower-ly.co.kr/")
                .successHandler(oAuth2LoginSuccessHandler) // 성공할 경우 수행할 핸들러
                .failureHandler(oAuth2LoginFailureHandler) // 실패할 경우 수행할 핸들러
                .userInfoEndpoint()
                .userService(customOAuth2MemberService);//Oauth2 정보를 가져오는데 사용할 서비스

        return http.build();
    }


    //CORS 허용 적용ㅎ
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.addAllowedOriginPattern("*"); //모든 도메인에 대해 Request 허용
        corsConfiguration.addAllowedHeader("*");        //모든 헤더 허용
        corsConfiguration.addAllowedHeader("*");        //모든 메소드 허용
        corsConfiguration.setAllowCredentials(true);    //모든 요청, 응답에서 인증정보 처리

        //인스턴스를 생성해 모든 경로에 대해 corsConfiguration을 적용하도록 한다.
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
