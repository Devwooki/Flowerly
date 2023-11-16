package com.ssafy.flowerly.member;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.exception.CustomException;
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
        jwtService.sendDeleteToken(request, response);
        return new CustomResponse(200, "logout");
    }

    @DeleteMapping("/signout")
    public CustomResponse signOut(HttpServletRequest request, HttpServletResponse response){
        Long memberId = (Long) request.getAttribute("memberId");
        log.info("{}", memberId);
        memberService.signout(memberId);
        jwtService.sendDeleteToken(request, response);

        return new CustomResponse(HttpStatus.OK.value(), "회원탈퇴 성공");
    }

    @GetMapping("/dummy-token/{memberId}")
    public DataResponse<?> getDummyToken(@PathVariable Long memberId,
                                         HttpServletRequest request){
        return new DataResponse<>(HttpStatus.OK.value(), "더미토큰 발사!!", jwtService.makeDummyToken(memberId));
    }

    @GetMapping("/dummy/{type}/{rediURL}")
    public void redierect(@PathVariable String rediURL,
                          @PathVariable String type,
                          HttpServletRequest request,
                          HttpServletResponse response){
        try{
            StringBuilder redirectUrl = new StringBuilder();
            Long memberId = null;

            redirectUrl.append(rediURL.equals("flower")
                    ? "https://flower-ly.co.kr/temp?token="
                    : "http://localhost:3000/temp?token=");

            memberId = type.equals("buyer") ? 108L: 109L ;

            //flower-ly.co.kr/api/member/dummy/(buyer||seller)/(local || flower)

            String tempAccessToken = jwtService.createTempAccessToken(memberId);
            redirectUrl.append(tempAccessToken);

            response.sendRedirect(redirectUrl.toString());
        }catch(Exception e) {
            log.error("더미 입력 도중 에러 발생{}", e.getMessage());
            throw new CustomException(ErrorCode.INVALID_ACCESS);
        }
    }


    @GetMapping("/execution/{type}")
    public void redierect(@PathVariable String type,
                          HttpServletRequest request,
                          HttpServletResponse response){
        try{
            StringBuilder redirectUrl = new StringBuilder();
            Long memberId = null;

            redirectUrl.append("https://flower-ly.co.kr/temp?token=");
            memberId = type.equals("buyer") ?108L: 109L ;

            String tempAccessToken = jwtService.createTempAccessToken(memberId);
            redirectUrl.append(tempAccessToken);

            response.sendRedirect(redirectUrl.toString());
        }catch(Exception e) {
            log.error("더미 입력 도중 에러 발생{}", e.getMessage());
            throw new CustomException(ErrorCode.INVALID_ACCESS);
        }
    }
}
