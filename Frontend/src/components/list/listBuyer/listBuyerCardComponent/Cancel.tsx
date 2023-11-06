import React from "react";
import style from "./Cancel.module.css";

type CancelProps = {
  onCancel: () => void;
};

const Cancel = ({ onCancel }: CancelProps) => {
  return (
    <div className={style.checkBack}>
      <div className={style.modalBack}>
        <div>진행중인 플리를 취소하시겠습니까?</div>
        <div>진행중인 내용이 영구적으로 삭제됩니다.</div>
        <div className={style.modalBtnBox}>
          <div onClick={onCancel}>취소</div>
          <div onClick={() => console.log("ㅇㅇ 취소할께!!!!!!")}>확인</div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
