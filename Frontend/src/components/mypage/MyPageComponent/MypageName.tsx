import React, { useState } from "react";
import style from "./style/MypageName.module.css";
import { memberInfoState, MemberInfo } from "@/recoil/memberInfoRecoil";
import { useRecoilValue } from "recoil";

interface MypageNameProps {
  name: string;
}

const MypageName: React.FC<MypageNameProps> = ({ name }) => {
  return (
    <>
      <div className={style.MypageNameBack}>
        <div>판매자님 반갑습니다</div>
        <div>{name}</div>
      </div>
      {/* 아래 div 없애지 말아주세요! */}
      <div></div>
    </>
  );
};

export default MypageName;
