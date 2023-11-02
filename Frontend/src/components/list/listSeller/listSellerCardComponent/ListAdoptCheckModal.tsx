import React, { useEffect } from "react";
import style from "./ListAdoptCheckModal.module.css";
import axios from "axios";
import { ToastErrorMessage, ToastSuccessMessage } from "@/model/toastMessageJHM";

interface Props {
  ModalChangeHandler: () => void;
  $selectId: number;
  UpdateAdptList: (fllyUpdateProgress: string) => void;
}

const ListAdoptCheckModal = ({ ModalChangeHandler, $selectId, UpdateAdptList }: Props) => {
  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    //상위 함수를 실행하지 말아라 (모달 꺼지는거 방지)
    e.stopPropagation();
  };

  const SummitBtnHandler = () => {
    axios.patch("https://flower-ly.co.kr/api/seller/flly/update/" + $selectId).then((res) => {
      const rData = res.data;
      if (rData.code === 200) {
        console.log(rData);
        ToastSuccessMessage(rData.message);
        UpdateAdptList(rData.data.fllyUpdateProgress);
        ModalChangeHandler();
      } else {
        ToastErrorMessage(rData.message);
        ModalChangeHandler();
      }
    });
  };

  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div>제작을 완료하시겠습니까?</div>
          <div>주문자에게 보여지는 상태가 변경됩니다.</div>
          <div className={style.modalBtnBox}>
            <div onClick={ModalChangeHandler}>취소</div>
            <div onClick={SummitBtnHandler}>확인</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAdoptCheckModal;
