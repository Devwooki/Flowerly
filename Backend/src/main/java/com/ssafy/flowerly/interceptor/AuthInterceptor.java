package com.ssafy.flowerly.interceptor;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.exception.AuthException;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@Component
public class AuthInterceptor implements HandlerInterceptor {
    private final JWTService jwtService;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("{} 요청으로 인터셉터 접근", request.getRequestURI());
        //요청한 클라이언트 엔드포인트 출력
        String prevPath = request.getHeader("X-Request-Path");
        String prevHost = request.getHeader("X-Request-Host");
        //request를 보낸 대상의 end-point가 /temp가 아니면 예외 발생
        log.info("{}", request.getRequestURI());
        log.info("{}, {} ",prevPath, prevHost);

        if(prevHost == null || prevPath == null)
            throw new CustomException(ErrorCode.INVALID_ACCESS);

        if(!(prevPath.startsWith("/temp") || prevPath.startsWith("/signup"))
        && !(prevHost.equals("localhost:3000") || prevHost.startsWith("flower-ly.co.kr")))
            throw new AuthException(ErrorCode.INVALID_ACCESS);

        Long memberId =jwtService.extractAccessToken(request)
                .filter(jwtService::isValidToken)
                .flatMap(jwtService::extractMemberId)
                .orElseThrow(() -> new AuthException(ErrorCode.UNAUTHORIZED));

        request.setAttribute("memberId", memberId);

        jwtService.sendAccessTokenAndRefreshToken(response,
                jwtService.createAccessToken(memberId),
                jwtService.createRefreshToken(memberId));
        return true;
    }
}
