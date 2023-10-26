package com.ssafy.flowerly.config.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssafy.flowerly.repository.MemberRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Getter
public class JwtService {

    @Value("${jwt.secretkey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private int accessExpirarion;

    @Value("${jwt.refresh.expiration}")
    private int refreshExpirarion;

    private final MemberRepository memberRepository;

    public String createAccessToken(Long memberId){
        Date now = new Date();
        System.out.println(now);
        return JWT.create()
                .withSubject("AccessToken")
                .withExpiresAt(new Date(now.getTime() + accessExpirarion))
                .withClaim("memberId", memberId)
                .sign(Algorithm.HMAC512(secretKey));
    }

    public String createRefreshToken() {
        Date now = new Date();
        System.out.println(now);
        return JWT.create()
                .withSubject("RefreshToken")
                .withExpiresAt(new Date(now.getTime() + refreshExpirarion))
                .sign(Algorithm.HMAC512(secretKey));
        //refreshToken은 AccessToken 재발급을 위한 것이기 때문에 claims가 불필요하다
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
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("RefreshToken".equals(cookie.getName())) {
                    return Optional.of(cookie.getValue());
                }
            }
        }
        return Optional.empty();
    }

    public Optional<String> getAccessToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("AccessToken".equals(cookie.getName())) {
                    return Optional.of(cookie.getValue());
                }
            }
        }
        return Optional.empty();
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
        memberRepository.findByMemberId(memberId)
                .ifPresent(
                        member -> member.updateRefreshToken(refreshToken)
                );
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
