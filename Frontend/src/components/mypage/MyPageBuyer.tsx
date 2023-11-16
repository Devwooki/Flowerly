import React from "react";
import style from "./style/MyPageBuyer.module.css";
import Image from "next/image";
import { tokenHttp } from "@/api/tokenHttp";
import Router from "next/router";
import { useState } from "react";
import { ToastSuccessMessage } from "@/model/toastMessageJHM";
import { useRecoilValue, SetRecoilState, useRecoilState } from "recoil";
import { MemberInfo, memberInfoState } from "@/recoil/memberInfoRecoil";

const MyPageBuyer = () => {
  const [memberInfo, setMemberInfo] = useRecoilState<MemberInfo>(memberInfoState);

  const [newNickName, setNewNickName] = useState(memberInfo.nickName);

  const modifyNickName = () => {
    tokenHttp
      .put("/mypage/nickname", newNickName)
      .then((res) => {
        if (res.data.code === 200) {
          setNewNickName(res.data.data);
          ToastSuccessMessage("닉네임이 변경되었습니다.");
          Router.push("/mypage");

          const updatedMemberInfo = {
            ...memberInfo,
            nickName: res.data.data,
          };
          setMemberInfo(updatedMemberInfo);

          if (res.headers.authorization) {
            localStorage.setItem("accessToken", res.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          Router.push("/fllylogin");
        }
      });
  };

  const deleteMember = () => {
    tokenHttp
      .delete("/member/signout")
      .then((res) => {
        if (res.data.code === 200) {
          ToastSuccessMessage("탈퇴가 완료되었습니다.");

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("memberInfo");
          Router.push("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          Router.push("/fllylogin");
        }
      });
  };

  return (
    <>
      <div className={style.myInfoBack}>
        <div className={style.myInfoHeader}>
          <Image
            src="/img/btn/left-btn.png"
            alt="뒤로가기"
            width={13}
            height={20}
            onClick={() => {
              Router.back();
            }}
          />
          <div className={style.headerTitle}>내 정보 수정</div>
          <div className={style.deleteBtn} onClick={() => deleteMember()}>
            탈퇴하기
          </div>
        </div>
        <div className={style.myInfoMain}>
          <div className={style.imgLogo}>
            <Image src="/img/logo/flly_logo.png" alt="logo" width={200} height={200} />
          </div>
          <div className={style.nickName}>
            <input
              type="text"
              name="nickName"
              value={newNickName}
              onChange={(e) => setNewNickName(e.target.value)}
              className={style.nickNameInput}
            />
            <Image
              src="/img/icon/checked02.png"
              alt="check"
              width={40}
              height={40}
              onClick={modifyNickName}
              className={style.checkBtn}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageBuyer;
