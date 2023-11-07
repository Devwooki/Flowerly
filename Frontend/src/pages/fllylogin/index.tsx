import React from "react";
import Image from "next/image";
import style from "./fllylogin.module.css";
const FllyLogin = () => {
  return (
    <div className={style.headLogo}>
      <div className={style.imgLogo}>
        <Image src="/img/logo/temp_logo.png" alt="logo" width={200} height={200} />
      </div>
      <div>
        <a href="http://localhost:6090/oauth2/authorization/kakao">
          <Image src="/img/btn/kakao-login-btn.png" alt="kakao-login-btn" width={240} height={45} />
        </a>
      </div>
    </div>
  );
};

export default FllyLogin;
