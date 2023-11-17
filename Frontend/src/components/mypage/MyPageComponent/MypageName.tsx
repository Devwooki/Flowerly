import React, { useState } from "react";
import style from "./style/MypageName.module.css";
import { memberInfoState, MemberInfo } from "@/recoil/memberInfoRecoil";
import { useRecoilValue } from "recoil";

interface MypageNameProps {
  data: string;
}

const MypageName: React.FC<MypageNameProps> = ({ data }) => {
  const memberInfo = useRecoilValue<MemberInfo>(memberInfoState);

  const handleStoreDetail = () => {
    window.location.href = `/list/shop/${memberInfo.id}`;
  };

  return (
    <>
      <div className={style.MypageNameBack}>
        {memberInfo.role === "SELLER" ? (
          <>
            <div>판매자님 반갑습니다</div>
            <div onClick={handleStoreDetail}>{data}</div>
          </>
        ) : (
          <>
            <div>구매자님 반갑습니다</div>
            <div>{data}</div>
          </>
        )}
      </div>

      {/* 아래 div 없애지 말아주세요! */}
      <div></div>
    </>
  );
};

export default MypageName;
