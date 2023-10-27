package com.ssafy.flowerly.JWT;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;


@Slf4j
@Component
public class JWTProvider {

    @Value("${jwt.secretkey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private int accessExpirarion;

    @Value("${jwt.refresh.expiration}")
    private int refreshExpirarion;

    public String createAccessToken(Long memberId){
        Date now = new Date();
        log.info("{}의 AccessToken 생성 : {}", memberId, now.getTime());
        return JWT.create()
                .withSubject("AccessToken")
                .withExpiresAt(new Date(now.getTime() + accessExpirarion))
                .withClaim("memberId", memberId)
                .sign(Algorithm.HMAC512(secretKey));
    }

    public String createRefreshToken(Long memberId) {
        Date now = new Date();
        log.info("{}의 RefreshToken 생성 : {}", memberId, now.getTime());

        String refreshToken = JWT.create()
                .withSubject("RefreshToken")
                .withExpiresAt(new Date(now.getTime() + refreshExpirarion))
                .sign(Algorithm.HMAC512(secretKey));

        //redisService.saveRefreshToken(memberId, refreshToken);
        return refreshToken;
    }

    public void sendAccessTokenAndRefreshToken(HttpServletResponse response, String accesstoken, String refreshToken){
        //Java 11을 사용하면서 적용된 ResponseCookie Builder패턴 적용과 불변성을 가지게 됨
        ResponseCookie accessCookie = ResponseCookie.from("AccessToken", accesstoken)
                .path("/api")
                .sameSite("Lax") //
                .httpOnly(true)
                .secure(true)
                .maxAge(accessExpirarion)
                .build();
        ResponseCookie refreshCookie = ResponseCookie.from("RefreshToken", refreshToken)
                .path("/api/auth")
                .sameSite("Lax")
                .httpOnly(true)
                .secure(true)
                .maxAge(refreshExpirarion)
                .build();

        response.addHeader("Set-Cookie", accessCookie.toString());
        response.addHeader("Set-Cookie", refreshCookie.toString());
    }


    @Transactional
    public void sendDeletedToken(Long memberId, HttpServletResponse response){
        response.setStatus(HttpServletResponse.SC_OK);
        ResponseCookie accessCookie = ResponseCookie.from("AccessToken", "")
                .path("/api")
                .sameSite("Lax")
                .httpOnly(true)
                .secure(true)
                .maxAge(0)
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("RefreshToken", "")
                .path("/api/auth")
                .sameSite("Lax")
                .httpOnly(true)
                .secure(true)
                .maxAge(0)
                .build();

        response.addHeader("Set-Cookie", accessCookie.toString());
        response.addHeader("Set-Cookie", refreshCookie.toString());

        updateRefreshToken(memberId, "");
    }

    public Optional<String> getRefreshToken(HttpServletRequest request) {
        return Arrays.stream(request.getCookies())
                .filter(cookie -> "RefreshToken".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }

    public Optional<String> getAccessToken(HttpServletRequest request) {
        return Arrays.stream(request.getCookies())
                .filter(cookie -> "AccessToken".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }

    public Optional<Long> getMemberId(String accessToken){
        try{
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(accessToken)
                    .getClaim("memberId")
                    .asLong());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Transactional
    public void updateRefreshToken(Long memberId, String refreshToken) {
        //redisService.updateRefreshToken(memberId, refreshToken);
    }

    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
