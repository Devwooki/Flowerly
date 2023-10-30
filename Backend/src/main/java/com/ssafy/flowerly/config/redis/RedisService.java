package com.ssafy.flowerly.config.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisService {
    private RedisTemplate<String, Object> redisTemplate;
    private static final String TRACKING = "tracking: ";
    private static final long TRACKING_USER_EXPIRE_TIME = 15 * 1000L;    // 15초

    //유저 세션이 있는지 체크. 중복로그인을 막기 위함
    public boolean checkDuplicateLogins(String email) {
        return redisTemplate.opsForValue().get(TRACKING + email) != null;
    }

    public void saveTrackingUserSession(String email, String token) {
        if(email.equals("flower-ly@co.kr")) return; //관리자는 중복 접속을 허용한다.

        //토큰을 비교해서 같은 이용자는 유효시간을 갱신시킨다
        //토큰이 삭제된다면 갱신 못하고 재 로그인하도록 변경
        if(!checkDuplicateLogins(email) || token.equals(redisTemplate.opsForValue().get(TRACKING + email))){
            //redis에 데이터를 저장하는데 사용하는 코드.
            redisTemplate.opsForValue().set(TRACKING + email, token, TRACKING_USER_EXPIRE_TIME, TimeUnit.MILLISECONDS);
        }else{
            log.info("이용 하실 수 없습니다.");
        }
    }

    //로그아웃 시 해당 유저의 세션을 제거한다.
    public void removeTrackingUserSession(String email, String token) {
        if (token.equals(redisTemplate.opsForValue().get(TRACKING + email)))
            redisTemplate.delete(TRACKING + email);
    }
}
