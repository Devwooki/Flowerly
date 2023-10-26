import React from "react";
import style from "components/navi/Navi.module.css";
import Image from "next/image";
//네비 이미지 경로
import homeWhite from "@public/navi/home-white.png";
import homeDark from "@public/navi/home-dark.png";
import listWhite from "@public/navi/list-white.png";
import listDark from "@public/navi/list-dark.png";
import filyWhite from "@public/navi/fily-white.png";
import filyDark from "@public/navi/fily-dark.png";
import chatWhite from "@public/navi/chat-white.png";
import chatDark from "@public/navi/chat-dark.png";
import myWhite from "@public/navi/my-white.png";
import myDark from "@public/navi/my-dark.png";

const Navi = () => {
  return (
    <div className={style.naviMain}>
      <div className={style.item}>
        <Image src={homeWhite} alt="홈" />
      </div>
      <div className={style.item}>
        <Image src={listWhite} alt="현황" />
      </div>
      <div className={style.item}>
        <Image src={filyWhite} alt="플리" />
      </div>
      <div className={style.item}>
        <Image src={chatWhite} alt="채팅" />
      </div>
      <div className={style.item}>
        <Image src={myWhite} alt="마이" />
      </div>
    </div>
  );
};

export default Navi;
