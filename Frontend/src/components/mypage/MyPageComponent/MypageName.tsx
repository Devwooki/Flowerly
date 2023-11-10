import React, { useState } from "react";
import style from "./style/MypageName.module.css";
import { memberInfoState, MemberInfo } from "@/recoil/memberInfoRecoil";
import { useRecoilValue } from "recoil";

const MypageName = () => {
  //나중에 리코일~!!
  const memberInfo = useRecoilValue<MemberInfo>(memberInfoState);

  return (
    <>
      {memberInfo.role === "SELLER" && (
        <div className={style.MypageNameBack}>
          <div>판매자님 반갑습니다</div>
          <div>{memberInfo.nickName}</div>
        </div>
      )}
      {memberInfo.role === "USER" && (
        <div className={style.MypageNameBack}>
          {/* 아래 div 없애지 말아주세요! */}
          <div></div>
          <div>
            <div>김동민 님</div>
            <div>닉네임 변경</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MypageName;
