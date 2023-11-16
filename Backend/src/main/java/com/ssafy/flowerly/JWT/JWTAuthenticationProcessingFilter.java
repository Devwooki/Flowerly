package com.ssafy.flowerly.JWT;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.exception.AuthException;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.member.model.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
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


    /** ============== 23.11.09 토큰 검증 로직 수정 ===============
     * 1. AccessToken 검증
     *   if(AccessToken == null) : 리프레시 토큰을 요청한다.
     * 2.
     *
     * */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //return을 하게 되면 Servlet 컨테이너를 넘어 Interceptor -> Controller로 접속하게 된다.
        //멤버 검증 로직은 인터셉터에서 수행하므로 filter를 넘어간다.
        if(request.getRequestURI().startsWith("/api/member/dummy-token")    //더미 토큰 요청시 필터 안거침
        || request.getRequestURI().startsWith("/stomp-chat")                //Stomp 요청시
        || request.getRequestURI().startsWith("/api/member/dummy/")                //더미 요청시
        || request.getRequestURI().startsWith("/api/member/execution")          //시연용 계정 접속
        || request.getRequestURI().startsWith("/api/address")                //주소 정보 요청시
        || request.getRequestURI().equals("/api/member")                //멤버 정보 요청시
        ){
            filterChain.doFilter(request, response);
            return;
        }



        //EndPoint가 /oauth2, favicon을 요청할 경우 컨트롤러로 들어간다. 즉 무시해도 되는 요청
        if(request.getRequestURI().equals(NO_CHECK_URL) || request.getRequestURI().contains("favicon")){
            filterChain.doFilter(request,response);
            return;
        }

        // >>>>>>>>>>>>>>>>>>>>>>>> 지금부터 검증 시작 <<<<<<<<<<<<<<<<<<<<<<<<<<
//         검증 시나리오
//         1. 클라이언트는 AccessToken을 가지고 서버에 자유롭게  요청한다.
//         -> 만료되거나 유효하지 않으면 null이므로 refreshToken을 검증한다.
//              -> refreshToken이 유효하다 : AccessToken을 재발급하고 RefreshToken도 재발급해주자
//              -> refreshToken도 만료 되었다 : 클라이언트에게 다시 로그인 하라고 한다.

        String accessToken = jwtService.extractAccessToken(request)
                .filter(jwtService::isValidToken)
                .orElse(null);

        //엑세스 토큰이 유효하므로 컨트롤러로 접속한다.
        if(accessToken != null){
            checkAccessTokenAndAuthentication(request, accessToken);
            filterChain.doFilter(request,response);
            return;
        }

        log.info("accesstoken이 만료 되었따!!!!! refreshToken 검증 시작");

        //accessToken이 만료 되었으므로 RefreshToken을 검증한다.
        String refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isValidToken)
                .orElse(null);

        if(refreshToken != null) {
            checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
        }else{
            response.sendError(403,"로그인 정보가 없거나 만료되어 재로그인이 필요합니다.");
        }
    }

    // AccessToken + 인증 처리 메소드
    //토큰이 유효하다면 accessToken에서 memberId를 추출하고 member를 찾아 인증 객체에 넣는다.
    //추후 Controller 등에서 사용하기 위해 Attribute에 memberId를 넣는다
    private void checkAccessTokenAndAuthentication(HttpServletRequest request, String accessToken){
        log.info("accessToken 검증 시작");

        jwtService.extractMemberId(accessToken)
                .flatMap(memberRepository::findByMemberId)
                .ifPresent(member -> {
                    log.info("{}", member.getMemberId());
                    request.setAttribute("memberId", member.getMemberId());
                    saveAuthentication(member);
                });
        log.info("검증 성공! 컨트롤러로 접속!");
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
    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) throws IOException {
        try{
            log.info(">>>> RefreshToken 검증 시작! <<<<");
            //RefreshToken으로 유저 정보(ID) 찾기
            String storedValue = redisTemplate.opsForValue().get(refreshToken);
            if(storedValue == null)
                response.sendError(403,"로그인 정보가 없거나 만료되어 재로그인이 필요합니다.");

            //기존 RefreshToken 제거
            redisTemplate.delete(refreshToken);

            // RefreshToken 및 AccessToken 재발급
            log.info("storedValue :{}", storedValue);
            Long memberId = Long.valueOf(storedValue);
            reIssueTokens(response, memberId);

        }catch(Exception e){
            e.printStackTrace();
            response.sendError(403,"로그인 정보가 없거나 만료되어 재로그인이 필요합니다.");
        }
    }

    private void reIssueTokens(HttpServletResponse response, Long memberId) {
        String reIssueRefreshToken = jwtService.createRefreshToken(memberId);
        String reIssueAccessToken = jwtService.createAccessToken(memberId);

        jwtService.sendAccessTokenAndRefreshToken(response, reIssueAccessToken, reIssueRefreshToken);
    }

    private static class MyResponse{
        int code;
        String message;
    }
}
