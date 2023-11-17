package com.ssafy.flowerly.JWT;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.flowerly.exception.AuthException;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Getter
@Slf4j
@RequiredArgsConstructor
public class JWTService {
    @Value("${jwt.secretkey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private long accessExpiration;
    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.expiration}")
    private long refreshExpiration;
    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private final RedisTemplate<String, String> redisTemplate;


    private static final String BEARER = "Bearer ";

    public String createAccessToken(Long memberId){
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + accessExpiration);
        return JWT.create()
                .withSubject("AccessToken")
                .withExpiresAt(expireDate)
                .withClaim("memberId", memberId)
                .sign(Algorithm.HMAC512(secretKey));
    }

    public String createTempAccessToken(Long memberId){
        //log.info("memberInfo 전달용 임시 토큰 생성");
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + 30000); //10초 짜리
        return JWT.create()
                .withSubject("AccessToken")
                .withExpiresAt(expireDate)
                .withClaim("memberId", memberId)
                .sign(Algorithm.HMAC512(secretKey));
    }

    public String createRefreshToken(Long memberId){
        //refreshToken은 AccessToken 재발급을 위한 Token이기에 어떠한 Claim도 가지지 않는다.
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + refreshExpiration);
        String refreshToken =  JWT.create()
                .withSubject("RefreshToken")
                .withExpiresAt(expireDate)
                .sign(Algorithm.HMAC512(secretKey));

        //redis에 RefreshToken 저장
        redisTemplate.opsForValue().set(
                refreshToken,
                String.valueOf(memberId),
                refreshExpiration,
                TimeUnit.MILLISECONDS
        );

        return refreshToken;
    }

    //AccessToken을 헤더에 실어서 보낸다
    public void sendAccessToken(HttpServletResponse response, String accessToken){
        response.setStatus(HttpServletResponse.SC_OK);

        response.setHeader(accessHeader, BEARER + accessToken);
        //log.info("accessToken 재발급 : {}", accessToken);
    }

    //AccessToken 및 RefreshToken을 전송한다
    //AccessToken - Authorization Header
    //RefreshToken - HttpOnly Cookie
    public void sendAccessTokenAndRefreshToken(HttpServletResponse response,
                                               String accessToken,
                                               String refreshToken){
        response.setStatus(HttpServletResponse.SC_OK);
        response.setHeader(accessHeader,BEARER + accessToken);

        if(refreshToken != null){
            ResponseCookie refreshCookie = ResponseCookie.from(refreshHeader, refreshToken)
                    .sameSite("None")
                    .httpOnly(true)
                    .secure(true)
                    .maxAge(refreshExpiration)
                    .build();
            //log.info("refreshToken 만듬 : {}", refreshCookie.toString());
            response.setHeader("Set-Cookie", refreshCookie.toString());
        }

        //log.info("AccessToken 및 RefreshToken 설정 완");
    }

    // 헤더에서 AccessToken 추출
    public Optional<String> extractAccessToken(HttpServletRequest request) {
        //log.info("엑세스 토큰 추출중");
        return Optional.ofNullable(request.getHeader(accessHeader))
                .filter(accessToken -> accessToken.startsWith(BEARER))
                .map(accessToken -> accessToken.replace(BEARER, ""));
    }

    //쿠키에서 RefreshToken 추출
    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        //log.info("리프레시 토큰 추출중");
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (refreshHeader.equals(cookie.getName())) {
                    //log.info("리프레시 토큰 추출했지 : {} ", cookie.getValue());
                    return Optional.of(cookie.getValue());
                }
            }
        }
        return Optional.empty();
    }

    //토큰 유효성 체크 - AccessToken, RefreshToken 모두 검증한다
    public boolean isValidToken(String token){
        try{
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
            return true;
        }catch(Exception e){
            //log.error("유효하지 않은 토큰 입니다. {}", e.getMessage());
            return false;
        }
    }



    public Optional<Long> extractMemberId(String accessToken){
        try{
            return Optional.ofNullable(
                    JWT.require(Algorithm.HMAC512(secretKey)).build()
                            .verify(accessToken)
                            .getClaim("memberId")
                            .asLong());
        }catch(Exception e){
            return Optional.empty();
        }
    }

    public void sendDeleteToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = extractRefreshToken(request).orElseThrow(()-> new CustomException(ErrorCode.INVALID_REFRESH_TOKEN));
        //AccessToken 제거
        response.setHeader(accessHeader, "");

        // RefreshToken 쿠키 유효기간 0설정
        ResponseCookie refreshCookie = ResponseCookie.from(refreshHeader, refreshToken)
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .maxAge(0)
                .build();
        response.setHeader(refreshHeader, refreshCookie.toString());

        //Redis의 RefreshToken 제거
        redisTemplate.delete(refreshToken);

        //쿠키 전체 제거
        DeleteCookies(request,response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private void DeleteCookies(HttpServletRequest request, HttpServletResponse response){
        Cookie[] cookies = request.getCookies();
        for(Cookie cki : cookies){
            cki.setMaxAge(0);
            response.addCookie(cki);
        }
    }
    //=======================
    //    테스트용 더미 토큰 생성
    //=======================
    public Map<String, String> makeDummyToken(Long memberId){
        Map<String, String> tokens = new HashMap<>();
        Date now = new Date();
        Date veryBig = new Date(now.getTime() + 9999999999L);

        String dummyRefreshToken =  JWT.create()
                .withSubject("RefreshToken")
                .withExpiresAt(veryBig)
                .sign(Algorithm.HMAC512(secretKey));

        //redis에 RefreshToken 저장
        redisTemplate.opsForValue().set(
                dummyRefreshToken,
                String.valueOf(memberId),
                9999999999L,
                TimeUnit.MILLISECONDS
        );
        tokens.put("accessToken", JWT.create()
                                    .withSubject("AccessToken")
                                    .withExpiresAt(veryBig)
                                    .withClaim("memberId", memberId)
                                    .sign(Algorithm.HMAC512(secretKey)));
        tokens.put("refreshToken", dummyRefreshToken);

        return tokens;
    }
}
