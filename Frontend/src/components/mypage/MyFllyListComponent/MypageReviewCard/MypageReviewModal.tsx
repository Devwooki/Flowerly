import React, { useEffect } from "react";
import style from "./MypageReviewModal.module.css";
import axios from "axios";
import { ToastErrorMessage, ToastSuccessMessage } from "@/model/toastMessageJHM";

interface Props {
  ModalChangeHandler: () => void;
  $selectId: number;
  UpdateAdptList: (fllyUpdateReviewState: boolean) => void;
}

const MypageReviewModal = ({ ModalChangeHandler, $selectId, UpdateAdptList }: Props) => {
  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    //상위 함수를 실행하지 말아라 (모달 꺼지는거 방지)
    e.stopPropagation();
  };

  const SummitBtnHandler = () => {
    //엑시오스 요청
    console.log($selectId);
  };

  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div className={style.modalMain}>
            <div>리뷰를 남겨주세요!</div>
            <div>상품에 대해 만족하셨나요? 상품에 대해 리뷰를 남겨주세요</div>
          </div>
          <textarea className={style.modalTextBox} />
          <div className={style.modalBtnBox}>
            <div onClick={SummitBtnHandler}>확인</div>
            <div onClick={ModalChangeHandler}>취소</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MypageReviewModal;
