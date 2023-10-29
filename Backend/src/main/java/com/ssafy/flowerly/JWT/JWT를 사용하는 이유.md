## JWT 채용 이유 
1. Session 방식을 채용하면 Stateful, 즉 서버가 유저 정보를 가지고 있어야한다.
2. 서버가 유저 정보를 가지고 있으면 유저가 많을수록 서버 부하가 커진다
3. 모바일에서도 로그인할 수 있다(Native는 Session을 보관할 수 없다.)

#### 단점
1. AccessToken 내부에 데이터가 많을 경우, 요청이 많을 경우 네트워크 부하가 발생한다
2. 토큰이 탈취 당하면 대처가 어렵다
3. PayLoad는 암호화를 하지 않기 때문에 중요한 정보는 담을 수 없다.


## ACCESS TOKEN
1. AccessToken이 유효한지는 비밀키(Signature)만을 검증하는 것이다.
2. 유효하다면 Controller로 넘어가 작업을 수행하게 된다.
3. HttpOnly Secure 방식을 채용한다. 
   - XSS, CSRF를 예방할 수 있따.

## REFRESH TOKEN
1. AccessToken이 만료되었을 때만 Redis에서 조회해서 유효한지 체크한다.

## 우리 프로젝트 진행 방향
1. RefreshToken은 Redis에서 관리한다.
   - RDB에 넣고 관리하는 것보다 I/O에서 최대 4배 정도의 성능 향상을 기대할 수 있다.
2. AccessToken을 발급할 때 마다 RefreshToken을 재발급하는 RTR 방식을 채용한다.
3. RefreshToken은 HttpOnly Cookie에 담아서 전송한다.
   - 클라이언트는 이의 존재를 몰라도 되기 때문 


## JWT로직
1. 로그인 시, ID/PW를 담아 서버로 Request
2. Spring 서버엣 Signed된 Access/Refresh Token(JWT)를 생성해 Response
    - AccessToken : MemberId 정도만 가지고 있다. Authorization Header에 담고 있음
        - OAuth2.0 표준을 맞춤으로써 상호 운용성을 향상 시킬 수 있다.
    - RefreshToken : 어떠한 데이터도 없다. HttpOnly, Secure을 적용한 Cookie에 저장한다.
      - XSS, CSRF를 예방할 수 있다.
)

## JWT구조
1. Header : 토큰 타입과 Signature에 적용할 알고리즘을 저장한다.
2. PayLoad : Claim이라고 부르는 토큰에 대한 정보가 저장되어 있다. 7개의 표준은 다음과 같다.
```text
1. iss(Issuer) : 토큰 발급자
2. sub(Subjec) : 토큰 제목 - 토큰에서 사용자에 대한 식별값이 된다.
3. aud(Audience) : 토큰 대상자
4. exp(Expiration Time) : 토큰 만료 시간
5. nbf(Not Before) : 토큰 활성 날짜 (이 날짜 이전의 토큰은 활성화 되지 않음을 보장)
6. iat(Issued At) : 토큰 발급 시간
7. jti(JWT Id) : JWT 토큰 식별자 (issuer가 여러 명일 때 구분하기 위한 값)
```
- 암호화 되어 있지 않기 때문에, 민감한 정보를 넣는 것은 **지양**해야한다
3. Signature : 가장 중요한 녀석, 서버가 가진 개인키로 복호화할 수 있다.
    - Request시 서버가 가진 secretKey로 Signature를 복호화한다
    - 복호화한 Signature의 base64UrlEncode(header)/base64UrlEncode(payload)가 각각 요청한 JWT 토큰의 header, payload와 일치하는지 검증합니다


![JWT로직 정리](https://velog.velcdn.com/images/iamminzzy/post/fe34833d-88aa-4467-96de-597379ca740e/image.png)
[구현참고한 링크](https://ksh-coding.tistory.com/59