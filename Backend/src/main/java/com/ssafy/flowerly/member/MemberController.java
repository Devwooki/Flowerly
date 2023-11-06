package com.ssafy.flowerly.member;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.exception.ErrorCode;
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

    @GetMapping("")
    public DataResponse<?> jwtTest(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        return new DataResponse(HttpStatus.OK.value(), "로그인 성공!", memberService.getMemberInfo(memberId));
    }
    @GetMapping("/need-login")
    public CustomResponse needLogin(HttpServletRequest request) {
        return new CustomResponse(ErrorCode.FORBIDDEN.getCode(), ErrorCode.FORBIDDEN.getMessage());
    }

    @PostMapping("/login")
    public CustomResponse login(HttpServletRequest request,
                                 @RequestBody Map<String, Object> data){
        return new CustomResponse(HttpStatus.OK.value(), "요청 성공");
    }
    @PostMapping("/signup/buyer")
    public CustomResponse signupBuyer(HttpServletRequest request,
                                 @RequestBody Map<String, Object> data){

        Long memberId = (Long) request.getAttribute("memberId");
        memberService.signupBuyer(data, memberId);

        return new CustomResponse(HttpStatus.OK.value(), "요청 성공");
    }

    @PostMapping("/signup/seller")
    public CustomResponse signupSeller(HttpServletRequest request,
                                 @RequestBody Map<String, Object> data){

        Long memberId = (Long) request.getAttribute("memberId");
        memberService.signupSeller(data, memberId);

        return new CustomResponse(HttpStatus.OK.value(), "요청 성공");
    }

    @GetMapping("/logout")
    public CustomResponse logOut(HttpServletRequest request, HttpServletResponse response){
        log.info("로그아웃 시작");

        //멤버 아이디 꺼내고, refreshToken 찾아 redis에서 제거한다. 카카오 로그아웃도 시킨다.
        String refreshToken = jwtService.extractRefreshToken(request).orElseGet(null);
        Long memberId = (Long) request.getAttribute("memberId");

        jwtService.sendDeleteToken(request, response);
        return new CustomResponse(200, "logout");
    }

    @GetMapping("/dummy-token/{memberId}")
    public DataResponse<?> getDummyToken(@PathVariable Long memberId,
                                        HttpServletRequest request){
        return new DataResponse<>(HttpStatus.OK.value(), "더미토큰 발사!!", jwtService.makeDummyToken(memberId));
    }
}
