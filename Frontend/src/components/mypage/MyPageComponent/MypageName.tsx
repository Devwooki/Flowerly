import React, { useState } from "react";
import style from "./style/MypageName.module.css";
import { memberInfoState, MemberInfo } from "@/recoil/memberInfoRecoil";
import { useRecoilValue } from "recoil";
import Link from "next/link";

interface MypageNameProps {
  data: string;
}

const MypageName: React.FC<MypageNameProps> = ({ data }) => {
  const memberInfo = useRecoilValue<MemberInfo>(memberInfoState);

  return (
    <>
      <div className={style.MypageNameBack}>
        {memberInfo.role === "SELLER" ? (
          <>
            <div>판매자님 반갑습니다</div>
            <div>{data}</div>
          </>
        ) : (
          <>
            <div>{data}</div>
            <Link href="/mypage/myinfo">닉네임 변경</Link>
          </>
        )}
      </div>

      {/* 아래 div 없애지 말아주세요! */}
      <div></div>
    </>
  );
};

export default MypageName;
