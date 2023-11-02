import React from "react";
import Image from "next/image";
import style from "./Login.module.css";
const Login = () => {
  return (
    <div className={style.headLogo}>
      <div className={style.imgLogo}>
        <Image src="/img/logo/temp_logo.png" alt="logo" width={200} height={200} />
      </div>
      <div>
        <a href="https://flower-ly.co.kr/oauth2/authorization/kakao">
          <Image src="/img/btn/kakao-login-btn.png" alt="kakao-login-btn" width={240} height={45} />
        </a>
      </div>
    </div>
  );
};

export default Login;
