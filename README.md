# 💐 당신을 위한 하나뿐인 꽃다발, 플리

![readmeBg2](https://github.com/sujeong1201/FLLY/assets/37768793/1eb894db-29c4-49b5-bfd0-b4a5030c1db2)

## 목차

[🌼프로젝트 개요](#프로젝트-개요)

[🌼설계](#설계)

[🌼주요 기능](#주요-기능)

[🌼서비스 화면](#서비스-화면)

[🌼팀원 소개](#팀원-소개)

---

## 🌼프로젝트 개요

### 1. 개발 기간

**2023.10.10 ~ 2023.11.17 (6주)**

### 2. 기획 배경

> **꽃다발을 구매 하고 싶은데** <br/>가격 비교가 어렵지 않으신가요? <br/>의미 있는 꽃다발을 선물하고 싶은데 꽃에 대해 잘 몰라 고민이신가요?

> **꽃다발을 판매 하고 싶은데** <br/>구매자가 무슨 꽃을 원하는지 알기 어렵지 않으신가요? <br/>우리 꽃집의 대한 홍보가 필요하신가요?

> 여기 당신을 위해 하나뿐인 꽃다발을 생성하고 구매자와 판매자를 연결해주는 **💐플리💐** 가 있습니다!

### 3. 프로젝트 소개

 <table>
 <tr>
 <td>
 💡 플리는 <b>생성형 AI</b>를 활용하여 <b>맞춤 꽃다발</b>을 생성하고 주문하는 서비스입니다. 
 </td>
 </tr>
</table>

플리에는 `구매자, 판매자`가 존재합니다.

구매자는 나만의 꽃다발을 생성하고 선택한 꽃다발 시안을 플리(경매)에 신청할 수 있습니다.

판매자는 주변에 가능한 플리를 픽업과 배달로 찾아 참여할 수 있습니다.

주문 관리와 채팅 기능, 알림 기능을 사용하여 플리에 참여해보세요!

## 🌼설계

### 1. ERD

![플리 ERD](https://github.com/sujeong1201/FLLY/assets/37768793/56636f01-035f-4ee4-bb4f-34617b2ee69e)

### 2. 아키텍처

![아키텍처](https://github.com/sujeong1201/FLLY/assets/37768793/d0adcee1-0973-4429-b7b2-beb590abff7d)

### 3. 목업

![플리 피그마-1](https://github.com/sujeong1201/FLLY/assets/37768793/c46cabc5-c108-4ce7-b727-982457adc851)

![플리 피그마-2](https://github.com/sujeong1201/FLLY/assets/37768793/c4960f82-b99e-4fb1-9420-6073c106774f)

## 🌼주요 기능

### 꽃다발 생성 (구매자)

- 사용자 맞춤 꽃다발을 생성하고 의뢰할 수 있는 기능입니다.
- 구매 목적, 선물한 대상, 색상을 선택하면 그에 맞는 꽃 종류를 추천해주고, 원하는 꽃을 선택하여 **생성형 AI**를 통해 꽃다발 시안을 생성합니다.
- 꽃다발 시안과 예산, 마감, 요청 사항 등의 정보를 입력하여 제작을 의뢰합니다.

### 플리 참여 (판매자)

- 구매자가 제작을 의뢰한 꽃다발에 경매 형식으로 참여하는 기능입니다.
- 판매자는 예시 사진과 제시 금액을 입력하여 참여합니다.

### 채팅

- 구매자는 원하는 판매자와 대화를 시작할 수 있고, 실시간으로 채팅할 수 있는 기능입니다.
- 채팅방에서는 주문서를 작성 및 확인하고, 카카오페이로 결제할 수 있습니다.

### 주문 관리 (판매자)

- 참여한 플리, 채택된 플리 목록을 확인하고, 채택된 플리의 진행 상태를 관리하는 기능입니다.
- 제작 완료 시, 배달/픽업 완료 시에 완료하기 버튼을 눌러 진행 상태를 변경합니다.

### 알림

- 플리의 진행 상태, 주문 상태 등을 체크할 수 있도록 푸시 알림 기능을 제공합니다.
- FCM(Firebase Cloud Messaging) 서비스를 사용하여 PC, 모바일 환경 모두에서 알림을 받을 수 있습니다.

## 🌼서비스 화면

### 1. 로그인 및 회원가입

카카오 소셜 로그인을 제공합니다. 판매자의 경우 사업자 등록 번호 확인이 필요합니다.

<p align="center">
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/55aafa94-1c35-4b8f-b906-ba250fa7889b" width="250" alt="로그인"></img>
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/574d7758-0f04-4c75-8ee1-1002a6544b4f" width="250" alt="회원가입"></img>
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/5b3c70a3-1c87-4c15-80a6-389df6ec1b88" width="250" alt="회원가입_판매자"></img>
</p>

### 2. 꽃다발 생성 및 의뢰

① 구매 목적, 대상, 색상 선택, ② 꽃 선택, ③ 꽃다발 시안 선택, ④ 의뢰서 작성, 4개의 단계를 거쳐 꽃다발 제작을 의뢰합니다.

<p align="center">
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/f8af323e-78f4-41e5-ba82-129889b4ccc1" width="250" alt="플리생성1"></img>
</p>


### 3. 주변 플리

주변 플리 목록을 배달, 픽업을 나누어 볼 수 있고, 원하는 플리에 참여합니다.

<p align="center">
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/dbe43362-f998-47b4-8c07-dd172b2ff086" width="250" alt="주변플리목록"></img>
</p>

### 4. 진행중인 플리 - 구매자

진행중인 플리의 정보와 상태를 확인하고, 플리에 참여한 판매자들을 보고 원하는 항목의 채팅하기 버튼을 눌러 채팅방을 생성합니다.

<p align="center">
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/9dd9b07b-9f96-41c7-b189-95158bb0966a" width="250" alt="플리스트_가게선택"></img>
</p>

### 5. 진행중인 플리 - 판매자

진행중인 플리를 참여한 플리, 채택된 플리로 나누어 볼 수 있고, 채택된 플리에서 완료하기 버튼을 통해 진행 상태를 변경합니다.

<p align="center">
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/4afe4aa2-21e4-4bb8-a12a-c3c46495b3e0" width="250" alt="채택된플리_완료하기"></img>
</p>

### 6. 채팅

실시간 채팅을 할 수 있고, 사진 전송, 플리 정보 확인, 주문서 작성 및 확인, 결제하기 기능을 제공합니다.

<p align="center">
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/2dae3206-4bc6-49d9-884d-641e81633169" width="250" alt="채팅목록"></img>
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/7f3b27ec-2c51-4701-ad1b-9442fdd9ff55" width="250" alt="채팅방_메뉴"></img>
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/4bdbfa68-2094-469e-a44d-bba73a27007d" width="250" alt="채팅방_메세지들"></img>
</p>


### 7. 마이페이지 - 구매자

플리 내역, 내가 쓴 리뷰 목록, 내 정보 수정, 알림 여부 설정 기능을 제공합니다.

<p align="center">
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/2298d88c-1b7c-47dc-93eb-839eb05161f9" width="250" alt="마이페이지_구매자"></img>
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/70bdb98a-f635-4cc3-986b-f1c35ef6bf39" width="250" alt="마이페이지_플리내역"></img>
</p>

### 8. 마이페이지 - 판매자

대표사진 수정, 배달 가능 지역 변경, 플리 내역, 가게 리뷰 목록, 가게 정보 수정, 알림 여부 설정 기능을 제공합니다.

<p align="center">
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/45f7d51c-6061-4231-9cfb-fc1a193346a4" width="250" alt="마이페이지_판매자_리뷰"></img>
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/6bb87d3c-ae30-411a-a78e-ad6052f4f90f" width="250" alt="마이페이지_판매자_정보수정"></img>
<img src="https://github.com/sujeong1201/FLLY/assets/37768793/388b25d2-ba3a-47f0-b314-b47e5d7f328c" width="250" alt="마이페이지_판매자_대표이미지"></img>
</p>

## 🌼사용 기술

- Frontend
  - React
  - TypeScript
  - Redux
  - React-Query
  - Next.js
  - DALLE API
  - Kakao Map, Pay API
- Backend
  - Java11
  - SpringBoot 2.7.15
  - Firebase
- Database
  - MariaDB 11.0.3
  - Redis 7.0.12
  - MongoDB 5.0.22
- Infra
  - AWS ubuntu 20.04
  - Docker
  - Docker Compose
  - Jenkins

## 🌼팀원 소개

<table>
 <tr>
  <td>
  <a href="https://github.com/Devwooki"> 
   <img src="https://avatars.githubusercontent.com/u/70623636?v=4" />
  </a>
  </td>
    <td>
  <a href="https://github.com/giyeonkwon013"> 
   <img src="https://avatars.githubusercontent.com/u/122511574?v=4" />
  </a>
  </td>
    <td>
  <a href="https://github.com/DongMinE"> 
   <img src="https://avatars.githubusercontent.com/u/91265819?v=4" />
  </a>
  </td>
    <td>
  <a href="https://github.com/hayeongK"> 
   <img src="https://avatars.githubusercontent.com/u/83320865?v=4" />
  </a>
  </td>
    <td>
  <a href="https://github.com/sujeong1201"> 
   <img src="https://avatars.githubusercontent.com/u/37768793?v=4" />
  </a>
  </td>
    <td>
  <a href="https://github.com/wjdgusaho"> 
   <img src="https://avatars.githubusercontent.com/u/56811267?v=4" />
  </a>
  </td>
 </tr>
 <tr>
  <td><b>이현욱 (팀장)</b></td>
  <td><b>권기연</b></td>
  <td><b>김동민</b></td>
  <td><b>김하영</b></td>
  <td><b>정수정</b></td>
  <td><b>정현모</b></td>
 </tr>
 <tr>
  <td>Infra, BackEnd</td>
  <td>FrontEnd, BackEnd</td>
  <td>FrontEnd</td>
  <td>FrontEnd, BackEnd</td>
  <td>FrontEnd, BackEnd</td>
  <td>Infra, FrontEnd, BackEnd</td>
 </tr>
 <tr>
  <td>Security, 구매자 API, FCM, S3</td>
  <td>회원가입, 마이페이지</td>
  <td>메인 화면, 구매자 화면</td>
  <td>플리 생성, 생성형 AI</td>
  <td>채팅, 카카오페이</td>
  <td>판매자, 마이페이지</td>
 </tr>
</table>
