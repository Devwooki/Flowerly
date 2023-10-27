import React from "react";
import style from "components/navi/Navi.module.css";
import Image from "next/image";
//네비 이미지 경로
import homeWhite from "../../../public/navi/home-white.png";
import homeDark from "../../../public/navi/home-dark.png";
import listWhite from "../../../public/navi/list-white.png";
import listDark from "../../../public/navi/list-dark.png";
import filyWhite from "../../../public/navi/fily-white.png";
import filyDark from "../../../public/navi/fily-dark.png";
import chatWhite from "../../../public/navi/chat-white.png";
import chatDark from "../../../public/navi/chat-dark.png";
import myWhite from "../../../public/navi/my-white.png";
import myDark from "../../../public/navi/my-dark.png";

const Navi = () => {
  // const imageLoader: ImageLoader = ({ src, width, quality }: any) => {
  //   return `http://example.com/${src}?w=${width || 35}&q=${quality || 75}`;
  // };
  return (
    <div className={style.naviMain}>
      {/* <div className={style.item}>
        <Image src="/navi/my-white.png" alt="홈" width={35} height={35} />
      </div> */}
      {/* <div className={style.item}>
        <Image src="/navi/home-white.png" alt="홈" width={35} height={35} />
      </div>
      <div className={style.item}>
        <Image src="/navi/list-white.png" alt="현황" width={35} height={25} />
      </div>
      <div className={style.item}>
        <Image src="/navi/fily-white.png" alt="플리" width={40} height={40} />
      </div>
      <div className={style.item}>
        <Image src="/navi/chat-white.png" alt="채팅" width={40} height={35} />
      </div>
      <div className={style.item}>
        <Image src="/navi/my-white.png" alt="마이" width={30} height={35} />
      </div> */}
    </div>
  );
};

export default Navi;
