import React from "react";
import style from "./ChatStart.module.css";
import { motion } from "framer-motion";

type CancelProps = {
  onCancel: () => void;
};

const ChatStart = ({ onCancel }: CancelProps) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const handleConfirm = () => {
    console.log("확인 버튼이 클릭되었습니다.");
  };

  // const handleCancel = () => {
  //   console.log("취소 버튼이 클릭되었습니다.");
  // };

  return (
    <motion.div className={style.checkBack} exit="exit" variants={modalVariants}>
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
          <div onClick={onCancel}>취소</div>
          <div onClick={handleConfirm}>확인</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatStart;
