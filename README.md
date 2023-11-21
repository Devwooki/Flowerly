# 💐 당신을 위한 하나뿐인 꽃다발, 플리

![readmeBg2](/uploads/55bb2cdf283b2460ed13d7c4fbe360a7/readmeBg2.png)

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

> **꽃다발을 구매 하고 싶은데** 가격 비교가 어렵지 않으신가요? 의미 있는 꽃다발을 선물하고 싶은데 꽃에 대해 잘 몰라 고민이신가요?

> **꽃다발을 판매 하고 싶은데** 구매자가 무슨 꽃을 원하는지 알기 어렵지 않으신가요? 우리 꽃집의 대한 홍보가 필요하신가요?

> 여기 당신을 위한 하나 뿐이 꽃다발을 생성하고 구매자와 판매자를 연결해주는 **"플리"** 가 있습니다!

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

![플리_ERD](/uploads/46fd1c13e4002b5ee485532657084b3b/플리_ERD.png)

### 2. 아키텍처

![아키텍처](/uploads/c207f36988ae92db9f0c1af76d912e4c/아키텍처.PNG)

### 3. 목업

![플리_피그마-1](/uploads/57e7bba987e650b42fb63e549095bb6c/플리_피그마-1.PNG)

![플리_피그마-2](/uploads/7e909806cf42e7018a72dab73175771f/플리_피그마-2.PNG)

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
<img src="/uploads/cc4afc6c4d19cb5df4c83cab52d54fce/로그인_화면.PNG" width="300" alt="로그인"></img>
<img src="/uploads/8a5a604627a27dcd6c15a539e27b924c/회원가입-판매자.PNG" width="300" alt="회원가입_판매자"></img>
<img src="/uploads/eedea1a4430c445cecf10cf423313ee1/회원가입_판매자2.png" width="300" alt="회원가입_판매자2"></img>
</p>

### 2. 꽃다발 생성 및 의뢰

① 구매 목적, 대상, 색상 선택, ② 꽃 선택, ③ 꽃다발 시안 선택, ④ 의뢰서 작성, 4개의 단계를 거쳐 꽃다발 제작을 의뢰합니다.

<p align="center">
<img src="/uploads/26cf5c340902a3b4b60b9b53af02dd1a/플리_생성-1-목적.PNG" width="300" alt="플리생성1"></img>
<img src="/uploads/266e0e648785219133121e358066acae/플리_생성-2-대상.PNG" width="300" alt="플리생성2"></img>
<img src="/uploads/dc0bedf7dd90c6ccdd6c04fc8ab33927/플리_생성-3-색상.PNG" width="300" alt="플리생성3"></img>
</p>

<p align="center">
<img src="/uploads/abae2e86eef412cd06f7f9a2169a4961/플리_생성-4-꽃_목록.PNG" width="300" alt="플리생성4"></img>
<img src="/uploads/d7420b3d61c36f832a32c14439e83315/플리_생성-5-꽃다발_시안.PNG" width="300" alt="플리생성5"></img>
<img src="/uploads/44d4a1f0c76e13bb3a9d12189bb4c246/플리_생성-6-의뢰서.PNG" width="300" alt="플리생성6"></img>
</p>

### 3. 주변 플리

주변 플리 목록을 배달, 픽업을 나누어 볼 수 있고, 원하는 플리에 참여합니다.

<p align="center">
<img src="/uploads/24188e1ba8d4da7f003743adcd32f0af/판매자-주변_플리목록-픽업.PNG" width="300" alt="주변플리목록"></img>
<img src="/uploads/e24f255a9059ff39a37fbab87db6975c/플리_참여하기_화면.PNG" width="300" alt="플리참여하기"></img>
</p>

### 4. 진행중인 플리 - 구매자

진행중인 플리의 정보와 상태를 확인하고, 플리에 참여한 판매자들을 보고 원하는 항목의 채팅하기 버튼을 눌러 채팅방을 생성합니다.

<p align="center">
<img src="/uploads/3c20bd1aadcb103b817032a3fe7d8112/구매자-진행중인_플리.PNG" width="300" alt="진행중인플리"></img>
<img src="/uploads/2d8a2a56c9c3d50629e9126cbd2906e5/플리스트-2.PNG" width="300" alt="플리스트"></img>
<img src="/uploads/881c6cb95fd51cb0225a246ba85232ee/플리스트-한개선택.PNG" width="300" alt="플리스트_가게선택"></img>
</p>

### 5. 진행중인 플리 - 판매자

진행중인 플리를 참여한 플리, 채택된 플리로 나누어 볼 수 있고, 채택된 플리에서 완료하기 버튼을 통해 진행 상태를 변경합니다.

<p align="center">
<img src="/uploads/93b6278d0baf7c59ebe14e2b5f93a9e4/판매자-진행중인_플리-채택된_플리.PNG" width="300" alt="채택된플리"></img>
<img src="/uploads/91998da0818435b2c3dcba8ace26590a/판매자-진행중인_플리-참여한_플리.PNG" width="300" alt="참여한플리"></img>
<img src="/uploads/8a41704c7ab129d60a45ad75e7f7c3e2/판매자-진행중인_플리-완료하기_모달.PNG" width="300" alt="채택된플리_완료하기"></img>
</p>

### 6. 채팅

실시간 채팅을 할 수 있고, 사진 전송, 플리 정보 확인, 주문서 작성 및 확인, 결제하기 기능을 제공합니다.

<p align="center">
<img src="/uploads/40109a78d4e6bcf1ab78f09083dbcf40/채팅_목록.PNG" width="300" alt="채팅목록"></img>
<img src="/uploads/9017d969b0c016822165095aa36b1375/채팅방-3.PNG" width="300" alt="채팅방_메뉴"></img>
<img src="/uploads/5b0621fbf79b0b8a2e12523c53396977/채팅방-4-카카오페이까지.PNG" width="300" alt="채팅방_메세지들"></img>
</p>

<p align="center">
<img src="/uploads/99d61bf4731ab4fe127f952f56753538/채팅방-6-플리_정보.PNG" width="300" alt="채팅방_플리정보"></img>
<img src="/uploads/3dfd9b94e1888712c595b30b25861092/채팅방-5-주문서_작성.PNG" width="300" alt="채팅방_주문서작성"></img>
<img src="/uploads/3671776bf0a077d1f48c4a834907330f/채팅방-2-주문서_확인.PNG" width="300" alt="채팅방_주문서확인"></img>
</p>

### 7. 마이페이지 - 구매자

플리 내역, 내가 쓴 리뷰 목록, 내 정보 수정, 알림 여부 설정 기능을 제공합니다.

<p align="center">
<img src="/uploads/f8c9565defedce0742f2432378422998/마이페이지-구매자.PNG" width="300" alt="마이페이지_구매자"></img>
<img src="/uploads/9ef08e11f8de4f1cf90ea76e0fc81bb9/마이페이지-플리내역-구매자.PNG" width="300" alt="마이페이지_플리내역"></img>
<img src="/uploads/0041d23dc66d0710d6a4c22978e95418/마이페이지-리뷰-구매자.PNG" width="300" alt="마이페이지_구매자리뷰"></img>
</p>

### 8. 마이페이지 - 판매자

대표사진 수정, 배달 가능 지역 변경, 플리 내역, 가게 리뷰 목록, 가게 정보 수정, 알림 여부 설정 기능을 제공합니다.

<p align="center">
<img src="/uploads/9d0b46b29592b76ef88214237f36ae94/마이페이지-판매자-대표사진수정.PNG" width="300" alt="마이페이지_판매자"></img>
<img src="/uploads/96f2bc9290b42906f02918d03ab390ed/마이페이지-설정-판매자.PNG" width="300" alt="마이페이지_설정"></img>
<img src="/uploads/801e7df24e9df1681baa4350563e9ec3/마이페이지-리뷰-판매자.PNG" width="300" alt="마이페이지_판매자리뷰"></img>
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

<img src="/uploads/4bf9ab2eafbd513bcc0bd60543faab84/팀원소개.PNG" width="1000" alt="팀원소개"></img><br/>

### 담당 역할

<table>
<tr>
<td><b>이현욱</b></td>
<td>Security, 구매자 API, FCM, S3</td>
</tr>
<tr>
<td><b>권기연</b></td>
<td>회원가입, 마이페이지</td>
</tr>
<tr>
<td><b>김동민</b></td>
<td>메인 화면, 구매자 화면</td>
</tr>
<tr>
<td><b>김하영</b></td>
<td>플리 생성, 생성형 AI</td>
</tr>
<tr>
<td><b>정수정</b></td>
<td>채팅, 카카오페이</td>
</tr>
<tr>
<td><b>정현모</b></td>
<td>마이페이지, 판매자</td>
</tr>
</table>
