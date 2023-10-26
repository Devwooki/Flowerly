package com.ssafy.flowerly.config.auth;

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

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    //WebSecurityConfigurerAdapter가 deprecated 되어서 filterchain을 사용하나

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http    //httpSecurity 영역 - 세부적인 보안을 적용할 수 있는 API
            .formLogin().disable() //폼 로그인 사용을 제한 - Social서비스 이용할 것이기 때문
            .httpBasic().disable() //
            .csrf().disable() //csrf 보호 비활성화 함 -> 보호가 필요하지 않을때 사용
            .cors() //cors규칙을 정의하기 위해 사용
            .and()
            //Session관리 설정 : stateless를 설정함으로써, 각 요청에 대해 독립적인 처리 -> RESTful 서버에서 적용, 세션을 유지하지 않음
            .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            //iframe 표시하는 것을 막음 -> 보안에 강화
            .headers(header-> header.frameOptions().disable())

            //보안 규칙을 적용하는 역할
            .authorizeRequests(authorizeRequests -> authorizeRequests
                //endPoint에 따른 접근시 인증을 필요로 하는지 체크
                //.antMatchers("/api/conv/filter/**").permitAll() //해당 엔드포인트 모두 접근 O
                //.antMatchers("/api/product/pick/**").authenticated() //해당 엔드포인트 접근시 filter로
                //각 HTTP메소드들은 인증을 필요로함 -> Filter가 잡음
                .antMatchers(HttpMethod.POST).authenticated()
                .antMatchers(HttpMethod.DELETE).authenticated()
                .antMatchers(HttpMethod.DELETE).authenticated()
                .antMatchers(HttpMethod.PATCH).authenticated()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                // 인가
                //.antMatchers("/admin/**").hasAuthority(MemberRole.SELLER.name())
                //.anyRequest().permitAll()
            )
            // OAuth 로그인
            /*
            .oauth2Login(oauth2Login -> oauth2Login
                .loginPage("https://pnale.online/api/member/needLogin")
                .successHandler(oAuth2LoginSuccessHandler)
                .failureHandler(oAuth2LoginFailureHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
            )*/;


        //http.addFilterBefore(jwtAuthenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

//    @Bean
//    public JWTAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
//        return new JWTAuthenticationProcessingFilter(jwtService, memberRepository);
//    }
}
