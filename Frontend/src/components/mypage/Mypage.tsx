import React, { useEffect, useState } from "react";
import style from "./style/Mypage.module.css";
import MypageName from "./MyPageComponent/MypageName";
import MypageCategory from "./MyPageComponent/MypageCategory";
import MypageStoreImg from "./MyPageComponent/MypageStoreImg";
import { memberInfoState, MemberInfo } from "@/recoil/memberInfoRecoil";
import { useRecoilState } from "recoil";

const Mypage = () => {
  //나중에 리코일로 변경하면됩니다
  const [memberInfo, setMemberInfo] = useRecoilState<MemberInfo>(memberInfoState);

  useEffect(() => {
    console.log(memberInfo);
  }, []);

  return (
    <>
      <div className={style.MyPageBack}>
        <div className={style.MyPageTitle}>마이페이지</div>
        <div className={style.NameBox}>
          <MypageName />
        </div>
        {memberInfo.role === "SELLER" && (
          <div className={style.StoreImgBox}>
            <MypageStoreImg />
          </div>
        )}
        <div className={style.CategoryBox}>
          <MypageCategory />
        </div>
        {memberInfo.role === "SELLER" && (
          <div className={style.MypageSidBox}>
            <div>
              <div>가게 정보 보기</div>
              <div> &gt;</div>
            </div>
          </div>
        )}
        {memberInfo.role === "USER" && (
          <div className={style.MypageSidBox}>
            <div>
              <div>내정보 수정 </div>
              <div> &gt;</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Mypage;
