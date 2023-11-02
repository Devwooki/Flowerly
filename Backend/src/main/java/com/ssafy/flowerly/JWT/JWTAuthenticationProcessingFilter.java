package com.ssafy.flowerly.JWT;

import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.member.model.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@RequiredArgsConstructor
@Slf4j
// JWT 토큰을 담아 "/oauth" URL이외에 요청 보낼때, 유호성을 검사해 인증처리, 실패, 재발급 등을 수행함
// 클라이언트는 항상 RefreshToken과 AccessToken을 한 번에 보낸다.
public class JWTAuthenticationProcessingFilter extends OncePerRequestFilter {

    private static final String NO_CHECK_URL = "/oauth";
    private final JWTService jwtService;
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, String> redisTemplate;

    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //해당 필터는 JWT만 검증하므로 다음 필터에게 작업을 처리하도록한다.
        if(request.getRequestURI().equals(NO_CHECK_URL) || request.getRequestURI().contains("favicon")){
            filterChain.doFilter(request,response);
            return;
        }

        // 1. 헤더에 RefreshToken이 들어있는지 체크 | 헤더에 RefreshToken이 들어있으면 AccessToken이 만료됨
        // RefreshToken이 있으면 비교한 뒤 AccessToken을 재발급한다.
        // 유효하지 않거나, 없는 경우 -> null -> filter작업 이어서 수행
        String refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isValidToken)
                .orElse(null);

        if(refreshToken != null){
            log.info("refreshToken 검증 시작");
            checkRefreshTokenAndReIssueAccessToken(response,refreshToken);
            log.info("refreshToken 검증 끝");
        }

        //RefreshToken이 없거나 유효하지 않다면, AccessToken을 검사한다
        if (refreshToken == null) {
            checkAccessTokenAndAuthentication(request, response, filterChain);
            filterChain.doFilter(request, response);
        }
    }

    // AccessToken + 인증 처리 메소드
    //토큰이 유효하다면 accessToken에서 memberId를 추출하고 member를 찾아 인증 객체에 넣는다.
    //추후 Controller 등에서 사용하기 위해 Attribute에 memberId를 넣는다
    private void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("accessToken 검증 시작 : checkAccessTokenAndAuthentication() 호출");

        jwtService.extractAccessToken(request)
                .filter(jwtService::isValidToken)
                .flatMap(jwtService::extractMemberId)
                .flatMap(memberRepository::findByMemberIdAndIsRemovedFalse)
                .ifPresent(member -> {
                    request.setAttribute("memberId", member.getMemberId());
                    saveAuthentication(member);
                });

        log.info("검증 성공!");
    }

    // 인증을 수행하는 메소드
    /**@Param member : Spring에서 만든 회원 객체
     * User.builder() : UserDetais의 User 객체 <- Spring Security에서 지원하는 객체이다
     * */
    private void saveAuthentication(Member member) {
        UserDetails memberDetails = User.builder()
                .username(member.getSocialId())
                .password("") //소셜로그인의 경우 password가 null임, 하지만 인증 시 password가 null이면 안되므로 빈 문자열
                .roles(member.getRole().name())
                .build();

        //인증 객체 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                memberDetails,  // UserDetails 객체 ( 유저 정보를 가짐)
                null,           // credential 보통 비밀번호로 사용하나, 인증시 null로 사용한다.
                authoritiesMapper.mapAuthorities(memberDetails.getAuthorities()));
        // UserDetails.User안에

        //SecurityContext를 이용해 위에서 생성하s Authentication 객체 인증 허가 처리
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    //RefreshToken이 Redis에 있는지 체크하는 로직
    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {

        //RefreshToken으로 유저 정보(ID) 찾기
        Long memberId = Long.valueOf(redisTemplate.opsForValue().get(refreshToken));

        //값이 존재하면 accessToken생성해준다. 이때 RefreshToken도 다시 생성하는 RTR방식으로 적용
        if (memberId != null) {
            //기존 RefreshToken 제거
            redisTemplate.delete(refreshToken);

            //refreshToken을 새로 만든다
            String reIssueRefreshToken = jwtService.createRefreshToken(memberId);
            String reIssueAccessToken = jwtService.createAccessToken(memberId);

            jwtService.sendAccessTokenAndRefreshToken(response, reIssueAccessToken, reIssueRefreshToken);
        }
    }
}
