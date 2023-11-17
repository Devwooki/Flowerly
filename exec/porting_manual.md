# Porting Manual

# 환경설정 버전관리

### BE

**SPEC**

```
>> BE <<
Java : 11
Spring : 2.7.17

>> Infra <<
Docker : Docker version 24.0.7, build afdd53b
Dokcer Compose : Docker Compose version v2.21.0
Nginx(Package) : 1.18

>> DB <<
MariaDB : 11.0.3
MongoDB : 5.0.22
Redis : alpine:3.18
```

- Build Gradle Dependencies

    ```bash
    >> Dependencies <<
    //DB
    	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    	//Redis
    	implementation 'org.springframework.boot:spring-boot-starter-data-redis'
    	// MongoDB
    	implementation 'org.springframework.boot:spring-boot-starter-data-mongodb'
    
    	//Security
    	implementation 'org.springframework.boot:spring-boot-starter-security'
    	implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
    	runtimeOnly 'org.mariadb.jdbc:mariadb-java-client'
    	implementation 'org.springframework.security:spring-security-test'
    	implementation 'com.auth0:java-jwt:4.2.1'
    	implementation 'org.springframework.boot:spring-boot-starter-validation'
    	implementation 'com.google.code.gson:gson:2.10.1'
    
    	//AWS - S3 파일 업로드
    	implementation 'org.springframework.cloud:spring-cloud-starter-aws:2.2.6.RELEASE'
    	implementation 'com.amazonaws:aws-java-sdk-bom:1.11.228'
    	implementation 'com.amazonaws:aws-java-sdk-s3'
    	// S3 업로드릉 위한 리사이즈 라이브러리
    	implementation 'com.github.downgoon:marvin:1.5.5'
    	implementation 'com.github.downgoon:MarvinPlugins:1.5.5'
    
    	// 채팅 관련
    	implementation 'org.springframework.boot:spring-boot-starter-websocket'
    	implementation 'org.webjars:stomp-websocket:2.3.3-1'
    	implementation 'org.webjars:sockjs-client:1.1.2'
    
    	//FCM - 카톡 메세지
    	implementation group: 'com.google.firebase', name: 'firebase-admin', version: '6.8.1'
    ```

- application.yaml

    ```yaml
    server:
      port: 6090
      jackson:
        time-zone: Asia/Seoul
    
    # JWT
    jwt:
      #base64로 인코딩된 암호키, HS512를 사용할 것 이기 때문에 512비트인 64바이트 이상의 길이가 되야한다.
      secretkey: {}
      access:
        expiration: 21600000 # 1000m -> 1s, 60s -> 1m, 60m-> 1h
        header: Authorization
      refresh:
        expiration: 604800000 # 1주일
        #expiration: 50 # 1주일
        header: Authorization-refresh
    #URL
    url:
      service: https://flower-ly.co.kr
      test: http://localhost:3000
    
    spring:
      profiles:
        include: "oauth"
      jpa:
        hibernate:
          ddl-auto: update
        show-sql: false
        properties:
          hibernate:
            format_sql: true
            use_sql_comments: true
        database-platform: org.hibernate.dialect.MariaDB103Dialect
    
      datasource:
        username: {db아이디}
        password: {db비밀번호}
        url: {db url}
    
      redis:
        host: {db host}
        port: 1357
        password: '{redis 비밀번호}'
      data:
        mongodb:
          host: {db host}
          port: 1201
          database: {컬렉션}
          username: {db아이디}
          password: {db비밀번호}
          authentication-database: admin
    
    # S3 Settings
    cloud:
      aws:
        credentials:
          access-key: {s3 access-key}
          secret-key: {s3 secery-key}
        s3:
          bucket: {버킷명}
          dir: /{버킷경로}
        region:
          auto: false
          static: ap-northeast-2
        stack:
          auto: false
    ```

- application-oauth.yml

    ```yaml
    spring:
      security:
        oauth2:
          client:
            registration: # OAuth로그인시, 설정한 정보를 토대로 AccessToken을 Authorization Server에서 발급
              kakao:
                client-id: {카카오 client ID}
                client-secret: {카카오 client secret key}
                redirect-uri: http://localhost:6090/login/oauth2/code/kakao
                #redirect-uri: http://flower-ly.co.kr/login/oauth2/code/kakao
                authorization-grant-type: authorization_code
                client-authentication-method: POST
                client-name: Kakao
                scope:
                  - account_email
                  - profile_nickname
            provider: # AccessToken을 발급받은 후 Resource Server에 API 요청시 사용하는 ㅜ분
              kakao:
                authorization-uri: https://kauth.kakao.com/oauth/authorize
                token-uri: https://kauth.kakao.com/oauth/token
                user-info-uri: https://kapi.kakao.com/v2/user/me
                user-name-attribute: id
            # Spring에서 kakao, Naver는 Provider 정보를 제공해주지 않는다.
            # 구글 같은 경우, OpenID를 주는데 OAuth2Service를 구현해야한다.
    
    fcm:
      key:
        path: flower-ly-firebase-adminsdk.json
        scope: https://www.googleapis.com/auth/cloud-platform|
    ```

- flower-ly-firebase-adminsdk.json

    ```yaml
    Firebase 등록시 제공하는 Json key
    ```


### FE

**SPEC**

```
>> FE <<
Node : 18.16
react : 
Next.js : 13.XX
```

- package.json

    ```json
    {
      "name": "frontend",
      "version": "0.1.0",
      "private": true,
      "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
      },
      "dependencies": {
        "@emotion/react": "^11.11.1",
        "@emotion/styled": "^11.11.0",
        "@mui/material": "^5.14.16",
        "@mui/styled-engine-sc": "^6.0.0-alpha.4",
        "@mui/x-date-pickers": "^6.18.0",
        "@stomp/stompjs": "^7.0.0",
        "@types/react-slick": "^0.23.11",
        "axios": "^1.5.1",
        "browser-image-compression": "^2.0.2",
        "dayjs": "^1.11.10",
        "dotenv": "^16.3.1",
        "firebase": "^10.6.0",
        "framer-motion": "^10.16.4",
        "jwt-decode": "^4.0.0",
        "next": "^13.5.6",
        "openai": "^4.17.5",
        "react": "^18",
        "react-daum-postcode": "^3.1.3",
        "react-dom": "^18",
        "react-flatpickr": "^3.10.13",
        "react-intersection-observer": "^9.5.2",
        "react-kakao-maps-sdk": "^1.1.24",
        "react-query": "^3.39.3",
        "react-slick": "^0.29.0",
        "react-toastify": "^9.1.3",
        "recoil": "^0.7.7",
        "recoil-persist": "^5.1.0",
        "sharp": "^0.32.6",
        "slick-carousel": "^1.8.1",
        "sockjs-client": "^1.6.1",
        "styled-components": "^6.1.0",
        "swiper": "^11.0.3"
      },
      "devDependencies": {
        "@types/axios": "^0.14.0",
        "@types/jwt-decode": "^3.1.0",
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        "@types/react-flatpickr": "^3.8.10",
        "@types/sockjs-client": "^1.5.3",
        "eslint": "^8",
        "eslint-config-next": "13.5.6",
        "kakao.maps.d.ts": "^0.1.39",
        "typescript": "^5"
      }
    }
    ```

- .env

    ```yaml
    OPENAI_API_KEY = "{Open API Key}"
    NEXT_PUBLIC_KAKAOMAP_KEY = "{KAKAO MAP Key}"
    
    #firebase key
    FIREBASE_apiKey: "YOUR_KEY",
    FIREBASE_authDomain: "YOUR_KEY",
    FIREBASE_projectId: "YOUR_KEY",
    FIREBASE_storageBucket: "YOUR_KEY",
    FIREBASE_messagingSenderId: "YOUR_KEY",
    FIREBASE_appId: "YOUR_KEY",
    FIREBASE_measurementId: "YOUR_KEY",
    FIREBASE_vapid : "YOUR_KEY"
    ```

- firebase-messagin-sw.js

    ```jsx
    importScripts("https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js");
    importScripts("https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js");
    
    firebase.initializeApp({
      apiKey: "AIzaSyCDZIH8n2O56d5pYGfJQR6rl8p3gnxcTfM",
      authDomain: "flower-ly.firebaseapp.com",
      projectId: "flower-ly",
      storageBucket: "flower-ly.appspot.com",
      messagingSenderId: "973445539914",
      appId: "1:973445539914:web:4f7c1bf91af1a253a7deb3",
    });
    
    const messaging = firebase.messaging();
    
    self.addEventListener("push", function (event) {
      // 받은 푸시 데이터를 처리해 알림으로 띄우는 내용
    });
    
    self.addEventListener("notificationclick", function (e) {
      console.log("test");
    });
    
    self.addEventListener("push", function (e) {
      if (!e.data.json()) return;
    
      const resultData = e.data.json().notification;
      const notificationTitle = resultData.title;
      const notificationOptions = {
        body: resultData.body,
        icon: resultData.image, // 웹 푸시 이미지는 icon
        tag: resultData.tag,
      };
    
      self.registration.showNotification(notificationTitle, notificationOptions);
    });
    ```


# 인프라 환경

## 인프라 환경 세팅

EC2 접근후

1. 인스턴스 패키지 업데이트

    ```bash
    sudo yum update -y
    
    -ubuntu 일때 (우분트 시스템 업데이트)
    sudo apt-get update
    ```

2. docker 설치 ( 공식문서 [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/) )

    ```bash
    - ubuntu 일때 docker 설치
    sudo apt-get install ca-certificates curl gnupg
    
    - Docker 공식 GPG 키 추가
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    
    - Docker Repository 설치
    echo \
      "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt-get update
    
    - Docker 설치
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    - 실행 테스트
    docker -v
    
    -이미지 확
    sudo docker images
    ```


1. jenkins 설치
    1. [https://hub.docker.com/r/jenkins/jenkins](https://hub.docker.com/r/jenkins/jenkins)

    ```bash
    sudo docker pull jenkins/jenkins:jdk11   #(latest)
    ```

    - docker - jenkins 실행 ( feat . 이현욱 )

   [도커 컨테이너는 1회용이다. **볼륨 바인딩**을 하지 않을 경우 다시 컨테이너를 실행시키면 기존 데이터가 날아갈 수 있다.]

    ```bash
    # jenkins 환경 설정 저장을 위한 볼륨 생성
    $ docker volume create ${볼륨이름}
    
    # jenkins 이미지 실행
    $ docker run -d --name special_jenkins -p 9090:8080 -v jenkinsVolume:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -u root jenkins/jenkins:jdk11
    $ docker run -d --name ${컨테이너 이름} -p ${호스트접근포트}:${도커내부접근포트} -v ${생성한 볼륨이름}:/var/lib/jenkins -v /var/run/docker.sock:/var/run/docker.sock -u root ${jenkins이미지명 (이미지명:태그) 형태로 입력하자]
    # -d : 백그라운드에서 실행한다
    # --name : 컨테이너 이름을 지정해준다
    # -p : 포트 포워딩, 호스트로 접근하는 포트번호:도커 컨테이너 내부포트
    # -v : 볼륨 바인딩, ${호스트 경로 or docker volume}:${도커 컨테이너 내부 저장소} <- 여러개 등록할 수 있다.
    #      -> 여기서는 도커 컨테이너 내부 저장소를 `var/lib/jenkins` 라고 지정
    # -v /var/run/docker.sock:/var/run/docker.sock 해당 부분은 DooD를 구현하기 위해 적은 코드, 추후 설명
    # -u : 실행되는 도커 프로세스의 사용자 지정
    # jenkins:jdk11 : 실행시킬 docker image:tag
    ```

    ```docker
    # 우리 
    docker volume create jenkinsVolume
    
    docker run -d --name flly_jenkins -p 9090:8080 -v jenkinsVolume:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -u root jenkins/jenkins:jdk11
    
    docker exec flly_jenkins cat /var/jenkins_home/secrets/initialAdminPassword
    ```

    ```bash
    -포트 열릱지 확인
    sudo apt install net-tools
    
    netstat -tnlp
    ```

    - 만약 Jenkins가 접근이 되지않는다면

      EC2의 보안 프로토콜을 확인할것…

    - http:// EC2  pulic Ip4 : 위에 설정한 jenkis port번호

   ![Untitled](resouces/Untitled.png)

    - jekins 초기 비밀번호 위치를 모르겠다면

    ```bash
    docker exec ${jenkins 컨테이너 이름} cat /var/lib/jenkins/secrets/initialAdminPassword
    ```

    - 다운로드 ( Install suggestea plugins )

   ![Untitled](resouces/Untitled 1.png)

2. Jenkins 환경설정(feat 이현욱)
- Spring 과 React 를 Build 하고 배포하기 때문에 Docker를 설치해줘야한다..

```bash
sudo docker exec -it autonomous_jenkins sh

컨트럴 + D 빠져나올수잇
```

```bash
apt-get update
apt-get install ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-compose

```

→ jekins 플러그인으로 docker 설치해도되거같아요!

---

## SSL 인증 (HTTPS)

1. EC2 Local NginX 설치

```bash
$ sudo apt update
$ sudo apt install nginx
```

1. NginX 리버시 프록시 설정
- **`/etc/nginx/conf.d`** 디렉토리로 이동해서 nginx를 위한 설정 파일을 생성해보자.

```bash
$ cd /etc/nginx/conf.d
$ vim default.conf
```

- **`default.conf`** 파일을 생성하고 아래의 내용으로 채워주자. ( certbot을 위함 )

```bash
server {
    listen 80; 
    server_name k9b209.p.ssafy.io;   ${나의 도메인}

    location /.well-known/acme-challenge/ {
             allow all;
             root /var/www/certbot;
     }
}
```

- 참고한 다른 방법 ([https://hudi.blog/https-with-nginx-and-lets-encrypt/](https://hudi.blog/https-with-nginx-and-lets-encrypt/))

    ```bash
    server {
        listen 80;
        server_name your.domain.com;
    
        location / {
            proxy_pass http://192.168.XXX.XXX;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
        }
    }
    ```

    - proxy_pass에는 Ec2의 프라이빗 Ip 또는 퍼블릭 IP 입력

      **`proxy_pass`** 에는 프록시 서버가 클라이언트 요청을 전달할 리얼 서버의 주소를 적는다. 리버스 프록시의 큰 목적 중 하나는 실제 서버의 IP 주소를 클라이언트에게 노출하지 않기 위함이므로 여기서는 **프라이빗 IP**를 입력하였다. 퍼블릭 IP로 입력해도 큰 차이는 없다.



1. Port Open 설정 (80)
- ufw 구동된 상태에서 80 포트 추가하기

```bash
$ sudo ufw allow 80
```

- 80 포트 정상 등록되었는지 확인하기

```bash
$ sudo ufw status numbered
```

- 추가

    ```bash
    EC2 가 지급되었습니다. 아래 내용 참고해주시고 각 팀 채널에 키파일 공유드리겠습니다
    -------------------------------------------
    제공기간
    
    금일 ~ 자율 프로젝트 종료 시(종료 후 7일 이내 삭제 예정) 서버 도메인: k9[팀ID].p.ssafy.io 접속 방법
    : 제공된 인증키(.pem)를 사용하여 ubuntu 계정으로 SSH 접속 
      대전2반 2팀의 CLI 접속 예: ssh -i K9B202T.pem ubuntu@k9b202.p.ssafy.io
    
    주의 사항
    
    별도의 웹 콘솔 제공되지 않으며 원격 터미널만 접속 가능하므로 방화벽 설정에 주의 방화벽 기본 설정: 활성, 22번 포트만 접속 가능(첨부된 UFW 포트설정하기 참조)
    /home 및 시스템 디렉토리의 퍼미션 임의 변경 금지 퍼블릭 클라우드의 서버는 외부에서 쉽게 접근 가능하므로 중요한 파일 저장 및 계정
    , DB 등의 패스워드 설정에 주의 SSH 포트 차단, 공개키 삭제
    , 퍼미션 임의 변경 등으로 접속 불가 시 또는 해킹, 악성코드 감염 시 복구 불가(초기화 요청만 가능)
    
    -------------------------------------------
    
    ufw 적용 순서
    
    제공되는 EC2의 ufw(우분투 방화벽)는 기본적으로 활성화(Enable) 되어 있고,
    ssh 22번 포트만 접속 가능하게 되어 있습니다.
    
    포트를 추가할 경우 6번부터 참고하시고,
    처음부터 새로 세팅해 보실 경우에는 1번부터 참고하시기 바랍니다.
    
    1. 처음 ufw 설정 시 실수로 ssh접속이 안되는 경우를 방지하기 위해
       ssh 터미널을 여유있게 2~3개 연결해 놓는다.
    
    2. ufw 상태 확인
    $ sudo ufw status
    Status : inactive
    
    3. 사용할 포트 허용하기 (ufw inactive 상태)
    $ sudo ufw allow 22
    
    3-1 등록한 포트 조회하기 (ufw inactive 상태)
    $ sudo ufw show added
    Added user rules (see 'ufw status' for running firewall):
    ufw allow 22
    
    4. ufw 활성화 하기
    $ sudo ufw enable
    Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
    
    4.1 ufw 상태 및 등록된 rule 확인하기
    $ sudo ufw status numbered
    Status: active
    
         To                         Action      From
         --                         ------      ----
    [ 1] 22                         ALLOW IN    Anywhere
    [ 2] 22 (v6)                    ALLOW IN    Anywhere (v6)
    
    5. 새로운 터미널을 띄워 ssh 접속해 본다.
    C:\> ssh -i 팀.pem ubuntu@팀.p.ssafy.io
    
    6. ufw 구동된 상태에서 80 포트 추가하기
    $ sudo ufw allow 80
    
    6-1. 80 포트 정상 등록되었는지 확인하기
    $ sudo ufw status numbered
    Status: active
    
         To                         Action      From
         --                         ------      ----
    [ 1] 22                         ALLOW IN    Anywhere
    [ 2] 80                         ALLOW IN    Anywhere
    [ 3] 22 (v6)                    ALLOW IN    Anywhere (v6)
    [ 4] 80 (v6)                    ALLOW IN    Anywhere (v6)
    
    6-2. allow 명령을 수행하면 자동으로 ufw에 반영되어 접속이 가능하다. 
    
    7. 등록한 80 포트 삭제 하기
    $ sudo ufw status numbered
    Status: active
    
         To                         Action      From
         --                         ------      ----
    [ 1] 22                         ALLOW IN    Anywhere
    [ 2] 80                         ALLOW IN    Anywhere
    [ 3] 22 (v6)                    ALLOW IN    Anywhere (v6)
    [ 4] 80 (v6)                    ALLOW IN    Anywhere (v6)
    
    7-1. 삭제할 80 포트의 [번호]를 지정하여 삭제하기
          번호 하나씩 지정하여 삭제한다.
    $ sudo ufw delete 4
    $ sudo ufw delete 2
    $ sudo ufw status numbered  (제대로 삭제했는지 조회해보기)
    Status: active
    
         To                         Action      From
         --                         ------      ----
    [ 1] 22                         ALLOW IN    Anywhere
    [ 2] 22 (v6)                    ALLOW IN    Anywhere (v6)
    
    7-2 (중요) 삭제한 정책은 반드시 enable을 수행해야 적용된다.
    $ sudo ufw enable
    Command may disrupt existing ssh connections. Proceed with operation (y|n)? y입력
    
    기타
    - ufw 끄기
    $ sudo ufw disable
    ```


1. Cerbot 설치 및 Let’s Encrypt에서 SSL 인증서 발급
- Certbot은 손쉽게 SSL 인증서를 자동 발급할 수 있도록 도와주는 도구
- Certbot은 우분투의 snap 이라는 패키지 매니저를 사용하여 설치하는 것이 권장된다.
- 따라서 apt가 아닌 snap을 사용하여 설치하자.

```bash
$ sudo snap install certbot --classic
```

- SSL 인증서 발급

```bash
$ sudo certbot --nginx
```

→ 성공시

```java
server {
    server_name k9b209.p.ssafy.io;

    location /.well-known/acme-challenge/ {
             allow all;
             root /var/www/certbot;
     }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/k9b209.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/k9b209.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = k9b209.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name k9b209.p.ssafy.io;
    return 404; # managed by Certbot

}
```

## FE DockerFile

```docker
# 출처 https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# 이미지 용량을 크게 줄일 수 있다.
FROM node:18-alpine AS base

FROM base AS deps
# alpine 이미지는 glibc 대신 musl libc을 사용.
# 특정 라이브러리에 대해 문제가 발생할 수 있으므로 libc6-compat 패키지를 추가하는 것이 좋다.
# https://github.com/nodejs/docker-node/tree/main#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
# 의존성 패키지 설치
COPY package*.json ./
ENV TZ Asia/Seoul
RUN npm install

FROM base AS builder
WORKDIR /app
COPY . .
# deps 단계에서 설치한 의존성 패키지 복사
COPY --from=deps /app/node_modules ./node_modules
# build 진행
ENV TZ Asia/Seoul
RUN npm run build

FROM base AS runner
WORKDIR /app
# 보안 문제가 발생할 수 있으므로 도커 컨테이너 내에서 루트 권한으로 서버 프로세스를 실행하지 않는 것이 좋다.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# standalone 폴더 및 정적 파일 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
ENV TZ Asia/Seoul
CMD ["node", "server.js"]
```

## BE DockerFile

```docker
FROM openjdk:11

#ARG 도커 빌드 명령어를 사용할 때 입력받을수 있는 인자 선언
ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 6090
ENV TZ Asia/Seoul
#EntryPoint 컨테이너를 실요할 때, 실행할 명령어를 지정
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "app.jar"]
#테스트22 백 테스2 테스트22
```

## Docker-compose - BE, FE, HTTPS용

```docker
#도커 버전
version: "3"
services:
  flly_fe:
    image: wjdgusaho/flowerly_fe
    build:
      dockerfile: DockerFile
      context: ./Frontend
    container_name: flly_fe
    # volumes:
    #  - ./Frontend:/app
    #  - /app/node_modules
    #  - /app/.next
    stdin_open: true
    # restart: always
    expose:
      - "3000"

  flly_be:
    image: wjdgusaho/flowerly_be
    build:
      dockerfile: DockerFile
      context: ./Backend
    container_name: flly_be
    volumes:
      - ./Backend:/app
    restart: always
    expose:
      - "6090"

  mariadb:
    container_name: mariadb
    image: mariadb:11.0.3
    volumes:
      - /home/ubuntu/mysqlConfig:/var/lib/mysql
    ports:
      - "3306:3306"
    expose:
      - "3306"
    environment:
      - TZ=Asia/Seoul
      - MYSQL_ROOT_PASSWORD=flowerlybe-209
```

## Docker-compose - DB 및 cloud 개발환경 셋팅용

```docker
version: "3"

services:
  flly_jenkins:
    image: jenkins/jenkins:jdk11
    container_name: flly_jenkins
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - jenkinsVolume:/var/jenkins_home
    ports:
      - "9090:9090"
    environment:
      - TZ=Asia/Seoul

  flly_mariadb:
    image: mariadb:11.0.3
    container_name: flly_mariadb
    volumes:
      - /home/ubuntu/mysqlConfig:/var/lib/mysql
    environment:
      MYSQL_USER: "flowerly"
      MYSQL_PASSWORD: "flowerlybe-209"
      TZ: Asia/Seoul
    command: #명령어 실행
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    ports:
      - "3306:3306"

  flly_sonarqube:
    image: sonarqube:10.2.1-community
    container_name: flly_sonarqube
    ports:
      - "9191:9000"
    environment:
      - TZ=Asia/Seoul

  flly_redis:
    image: redis:alpine3.18
    container_name: flly_redis
    volumes:
      - /home/ubuntu/redisConfig:/data
    ports:
      - "1357:6379"
    environment:
      - TZ=Asia/Seoul
    command: redis-server --requirepass ssafyb209flowerly!!

  flly_mongo:
    image: mongo:5.0.22
    container_name: flly_mongo
    volumes:
      - /home/ubuntu/mongoConfig:/data/db
    ports:
      - "1201:27017"
    environment:
      - TZ=Asia/Seoul
      - MONGO_INITDB_ROOT_USERNAME=flowerly
      - MONGO_INITDB_ROOT_PASSWORD=flowerlybe-209
      - MONGO_INITDB_DATABASE=flowerly_chat
    command: [--auth]

volumes:
  jenkinsVolume:
```

## Nginx - default.conf

```bash
upstream flly_fe {
    server 172.19.0.2:3000;
}

upstream flly_be {
    server 172.24.0.2:6090;
}

server {
    listen 80 ;
    listen 3000 ;
    server_name flower-ly.co.kr;
    server_name k9b209.p.ssafy.io ;
    location / {
	return 301 https://$host$request_uri;
    }

    location /.well-known/acme-challenge/ {
            allow all;
            root /var/www/certbot;
    }
}

map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 443 ssl; # managed by Certbot
    server_name k9b209.p.ssafy.io;
    server_name flower-ly.co.kr;
    ssl_certificate /etc/letsencrypt/live/flower-ly.co.kr/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/flower-ly.co.kr/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    location / {
	add_header 'Access-Control-Allow-Origin' '*' ;
        proxy_pass http://flly_fe;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ~ ^/(api|login|oauth2|pub|sub|stomp-chat) {
        proxy_pass http://flly_be;
	proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

    }
}
```

## Nginx - nginx.conf

```bash
#user ubuntu;
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##
	# Set client body size
	client_max_body_size 15M;

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;

	# gzip_vary on;
	# gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf;
#	include /etc/nginx/sites-enabled/*;
}
```

---

## BE - pipeline

```bash
pipeline{
    
    agent any 
    
    //환경변수
    environment{
        BE_IMAGE_NAME = "wjdgusaho/flowerly_be"
    }
    
    stages {

        stage("git Clone"){
            steps {
              git branch: 'Back', credentialsId: "flly-token" , url: "https://lab.ssafy.com/s09-final/S09P31B209.git"
            }
            post {
                success{
                    sh 'echo "git clone success"'
                }
                failure{
                    sh 'echo "git clone fail"'
                }
            }
        }
       
        
        stage("Back Build"){
            steps{
                //기존 Back build 삭제
                sh 'rm -rf build'
                
                dir('/var/jenkins_home/workspace/flly_config/spring'){
                     sh '''
                        cp -r * /var/jenkins_home/workspace/Backend-Pipeline/Backend/src/main/resources
                    '''
                }
                
                dir('Backend'){
                    
                    sh '''
                        chmod +x gradlew
                        ./gradlew clean bootJar --no-daemon

                        ls -al
                    '''
                }
            }
            post {
                //build 성곳이
                success {
                    echo 'gradle build succes'
                }
                //실패
                failure {
                    echo 'gradle build failed'
                }
                
            }
        }
        
        stage ('Dockerization BackEnd'){
            steps{
                dir('Backend'){
                     sh  """
                    docker build --no-cache -t ${BE_IMAGE_NAME} -f DockerFile .
                    """
                }
            }
            post {
                 // 이미지 전송 성공시
                success {
                    sh 'echo "PUSH Docker BE Image Success"'
                }
                // 이미지 전송 실패시
                failure {
                    sh 'echo "PUSH Docker BE Image Fail"'
                }
            }
        }

        
        stage('Deploy'){
            steps{
                dir('.'){
                    sh "docker stop flly_be"
                    sh "docker rm -f flly_be"
                    
                    sh 'docker compose up -d flly_be'
                }
            }
            post{
                success {
                    sh 'echo "Bulid Docker Deploy Success"'
                }
                failure {
                    sh 'echo "Bulid Docker Deploy Fail"'
                }
            }
        }
    }
}
```

## FE - pipeline

```bash
pipeline {
    agent any
    
    environment {
        FE_IMAGE_NAME = "wjdgusaho/flowerly_fe"
        FE_CONTAINER_NAME = "flly_fe"
    }
    
    stages {
        stage("git Clone"){
            steps {
                git branch: 'Front', credentialsId: "flly-token" , url: "https://lab.ssafy.com/s09-final/S09P31B209.git"
            }
            post {
                success{
                    sh 'echo "git clone good"'
                }
                failure{
                    sh 'echo "git close bad"'
                }
            }
        }
        
        stage('Dockerizing FrontEnd') {
            steps {
                //기존 build 삭제
                sh 'rm -rf build'
                
                
                 dir('/var/jenkins_home/workspace/flly_config/react'){
                     sh '''
                        cp -r .env /var/jenkins_home/workspace/Front/Frontend/
                        cp -r firebase-messaging-sw.js  /var/jenkins_home/workspace/Front/Frontend/public
                    '''
                }
                
                
                dir('Frontend'){
                     sh  """
                    docker build  --no-cache -t ${FE_IMAGE_NAME} -f DockerFile .
                     """
                }
            }
            post{
                success {
                    sh 'echo "Bulid Docker Image Success"'
                }
                failure {
                    sh 'echo "Bulid Docker Image Fail"'
                }
            }
        }
        
        stage('Deploy'){
            steps{
                dir('.'){
                    script{
                        //컨테이너 정지 및 삭제
                        sh "docker stop ${FE_CONTAINER_NAME}"
                        sh "docker rm -f ${FE_CONTAINER_NAME}"
                        
                        //새로운 컨테이너 실행
                        sh "docker compose up -d flly_fe"
                    }
                }
            }
            post{
                 success {
                    sh 'echo "Bulid Docker Deploy Success"'
                }
                failure {
                    sh 'echo "Bulid Docker Deploy Fail"'
                }
                
            }
        }
    }
}
```

# Tools

- IntelliJ Ultimate
    - Build Tool : IntelliJ
- MySQL WorkBench
- Mongo Compass
- S3
- FireBase Cloud Message
- Kakao Developer
    - 카카로 로그인 동의항목
        - profile_nickname
        - account_email
