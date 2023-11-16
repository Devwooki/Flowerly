import React from "react";
import Image from "next/image";
import style from "./fllylogin.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { eventNames } from "process";
const FllyLogin = () => {
  const router = useRouter();

  const loginHandler = () => {
    // event.preventDefault();
    console.log("loginHandler");
    window.location.href = "https://flower-ly.co.kr/oauth2/authorization/kakao";
    //window.location.href = "http://localhost:6090/oauth2/authorization/kakao";
  };

  return (
    <div className={style.headLogo}>
      <div className={style.imgLogo}>
        <Image
          src="/img/logo/flly_logo.png"
          alt="logo"
          width={260}
          height={260}
          className={style.img}
        />
        <div className={style.imgText}>세상에 하나뿐인 꽃다발을 만들어보세요</div>

        <div>
          <div className={style.loginBox}>
            <Image
              src="/img/btn/kakao-login-btn.png"
              onClick={loginHandler}
              alt="kakao-login-btn"
              width={270}
              height={45}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FllyLogin;
