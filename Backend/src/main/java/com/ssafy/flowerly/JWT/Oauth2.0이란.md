## 개념
- 인터넷 사용자들이 **비밀번호를 제공하지 않고** 다른 웹 사이트 상의 자신들 정보에 대해 웹사이트나 애플리케이션의 접근 권한을 부여할 수 있는 **접근 위임 개방형 표준**
- 즉, 사용자는 애플리케이션에 직접 ID, PW를 제공하는 것이 아는 신뢰할 수 있는 Third-part(네이버, 카카오, google)등의 Open API를 활용해 애플리케이션의 인증을 처리해주는 것

## 용어
1. Resource Server : Oauth2.0을 서비스하고 제공하는 Resource관리 서버
   - Kakao, Naver, Google 등
2. Resource Owner : Resource Server 계정을 가진 사용자
3. Client : Resource Server의 API를 사용해 정보를 가져오는 서버
   - 우리 프로젝트에 적용시 **Spring Server**가 여기에 해당된다
4. Authorization Server : Client가 Resource Server의 서비스를 사용할 수 있게 인증하고, 토큰을 인증해주는 서버
    - Kakao, Naver, Google 등의 인증서버
    <br>
    - 사용자(Resource Owner) : ID, PW를 넘겨 Authorzation Code를 받음
    - 클라이언트(Client) : 사용자가 발급받은 Authorzation Code를 받아 AccessToken, RefreshToken 생성

   [구현 레퍼런스1](https://ksh-coding.tistory.com/70)
5. [구현 레퍼런스2](https://chb2005.tistory.com/178)