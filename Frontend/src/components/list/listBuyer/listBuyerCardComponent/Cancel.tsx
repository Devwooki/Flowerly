import React from "react";
import style from "./Cancel.module.css";
import { motion } from "framer-motion";
import { tokenHttp } from "@/api/tokenHttp";
import { ToastSuccessMessage } from "@/model/toastMessageJHM";

type CancelProps = {
  onCancel: () => void;
  onConfirm: () => void;
  fllyId: number;
};

const Cancel = ({ onCancel, onConfirm, fllyId }: CancelProps) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const handleConfirm = async () => {
    await tokenHttp
      .delete(`/flly/${fllyId}`)
      .then(() => {
        ToastSuccessMessage("해당 플리가 삭제되었습니다.");
      })
      .catch((error) => {});

    onConfirm();
  };

  return (
    <motion.div className={style.checkBack} exit="exit" variants={modalVariants} onClick={onCancel}>
      <motion.div
        className={style.modalBack}
        layout
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <div>진행중인 플리를 취소하시겠습니까?</div>
        <div>진행중인 내용이 영구적으로 삭제됩니다.</div>
        <div className={style.modalBtnBox}>
          <div>취소</div>
          <div onClick={handleConfirm}>확인</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cancel;
