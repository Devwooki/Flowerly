import React, { useState } from "react";
import style from "./UserTypeChangeModal.module.css";
import { useRecoilState } from "recoil";
import { MemberInfo, memberInfoState } from "@/recoil/memberInfoRecoil";

interface Props {
  userChangModalHandler: () => void;
}

const UserTypeChangeModal = ({ userChangModalHandler }: Props) => {
  const [userType, setUserType] = useState<string>();
  const [memberInfo, setMemberInfo] = useRecoilState<MemberInfo>(memberInfoState);

  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    //상위 함수를 실행하지 말아라 (모달 꺼지는거 방지)
    e.stopPropagation();
  };

  //유저정보 변경 눌렀을때
  const SummitBtnHandler = () => {
    if (memberInfo.role === "USER") {
      console.log("저 구매자인데 유저 정보변경을 눌렀어요!!!");
    } else if (memberInfo.role === "SELLER") {
      console.log("저 판매자인데 유저 정보변경을 눌렀어요!!!");
    }
  };

  return (
    <>
      <div className={style.checkBack} onClick={userChangModalHandler}>
        {memberInfo.role === "USER" ? (
          <div className={style.modalBack} onClick={NotClickEventHandler}>
            <div>판매자로 전환하시겠습니까?</div>
            <div>판매자로 전환시 사업자 등록 및 추가적인 정보를 입력하셔야합니다.</div>
            <div className={style.modalBtnBox}>
              <div onClick={userChangModalHandler}>취소</div>
              <div onClick={SummitBtnHandler}>확인</div>
            </div>
          </div>
        ) : (
          <div className={style.modalBack} onClick={NotClickEventHandler}>
            <div>구매자 전환하시겠습니까?</div>
            <div>구매자로 전환시 등록하신 판매자 관련 및 채팅 데이터가 사라집니다.</div>
            <div className={style.modalBtnBox}>
              <div onClick={userChangModalHandler}>취소</div>
              <div onClick={SummitBtnHandler}>확인</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserTypeChangeModal;
