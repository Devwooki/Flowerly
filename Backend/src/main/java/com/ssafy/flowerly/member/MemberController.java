package com.ssafy.flowerly.member;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.member.model.MemberService;
import com.ssafy.flowerly.util.CustomResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final JWTService jwtService;

    @GetMapping("/jwt-test")
    public CustomResponse jwtTest(){
        return new CustomResponse(HttpStatus.OK.value(), "JWT요청 성공");
    }

    @GetMapping("/logout")
    public CustomResponse logOut(HttpServletRequest request, HttpServletResponse response){
        log.info("로그아웃 시작");
        Long memberId = Long.valueOf(request.getHeader(jwtService.getAccessHeader()));
        String refreshToken = jwtService.extractRefreshToken(request).orElseGet(null);

        jwtService.sendDeleteToken(request, response);

        return new CustomResponse(200, "logout");
    }
}
