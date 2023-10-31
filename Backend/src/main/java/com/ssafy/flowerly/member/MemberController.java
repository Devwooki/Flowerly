package com.ssafy.flowerly.member;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.member.model.MemberService;
import com.ssafy.flowerly.util.CustomResponse;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;
    private final JWTService jwtService;

    @GetMapping("/jwt-test")
    public CustomResponse jwtTest(HttpServletRequest request) {
        log.info("jwt-test 접근 : {}", request.getRequestURI());
        String accessToken = jwtService.extractAccessToken(request).get();
        Long memberId = jwtService.extractMemberId(accessToken).get();

        log.info("jwt-test 접근 : {} \n " +
                "토큰 넘어오냐 : {} \n" +
                "memberId 체크 : \n {}", request.getRequestURI(), accessToken, memberId);

        return new CustomResponse(HttpStatus.OK.value(), "JWT요청 성공");
    }

    @PostMapping("/login")
    public CustomResponse login(HttpServletRequest request,
                                 @RequestBody Map<String, Object> data){
        return new CustomResponse(HttpStatus.OK.value(), "요청 성공");
    }
    @PostMapping("/signup")
    public CustomResponse signup(HttpServletRequest request,
                                 @RequestBody Map<String, Object> data){
        return new CustomResponse(HttpStatus.OK.value(), "요청 성공");
    }


    @GetMapping("/logout")
    public CustomResponse logOut(HttpServletRequest request, HttpServletResponse response){
        log.info("로그아웃 시작");
        Long memberId = Long.valueOf(request.getHeader(jwtService.getAccessHeader()));
        String refreshToken = jwtService.extractRefreshToken(request).orElseGet(null);

        jwtService.sendDeleteToken(request, response);

        return new CustomResponse(200, "logout");
    }

    @GetMapping("/dummy-token/{memberId}")
    public DataResponse<?> getDummyToken(@PathVariable Long memberId,
                                        HttpServletRequest request){
        return new DataResponse<>(HttpStatus.OK.value(), "더미토큰 발사!!", jwtService.makeDummyToken(memberId));
    }
}
