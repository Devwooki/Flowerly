package com.ssafy.flowerly.JWT;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTProvider jwtProvider;
    private static  final String NO_CHECK_URL ="oauth";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("JWT 필터 접근");
        log.info("Requst URI : {}", request.getRequestURI());

        // *********************
        // AccessToken 검증 필터
        // *********************
        // 토큰이 없거나, 관계없는 요청, favicon을 찾는 경우 다른 filter를 진행
        // 반드시 로그인이 필요한 API는 Security의 Authentication 필터에 걸려서 403에러가 발생함
        Optional<String> accessToken = jwtProvider.getAccessToken(request);
        if(accessToken.isPresent()
                || request.getRequestURI().contains(NO_CHECK_URL)
                || request.getRequestURI().contains("favicon")){
            filterChain.doFilter(request, response);
            return;
        }

        // *********************
        // RefreshToken 검증 필터
        // *********************
        Optional<String> refreshToken = jwtProvider.getRefreshToken(request).filter(jwtProvider::isTokenValid);

        //refreshToken이 유효하므로 Id
//        if(refreshToken.isPresent()){
//
//        }


    }
}
