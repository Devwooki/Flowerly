import React from "react";
import style from "./ConfirmModal.module.css";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ComfirmModal = ({ onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <>
      <div className={style.checkBack}>
        <div className={style.modalBack}>
          <div>정말로 탈퇴하시겠습니까?</div>
          <div className={style.modalBtnBox}>
            <div onClick={onConfirm}>확인</div>
            <div onClick={onCancel}>취소</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComfirmModal;
