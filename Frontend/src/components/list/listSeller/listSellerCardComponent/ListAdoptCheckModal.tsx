import React from "react";
import style from "./ListAdoptCheckModal.module.css";

interface Props {
  ModalChangeHandler: () => void;
}

const ListAdoptCheckModal = ({ ModalChangeHandler }: Props) => {
  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    //상위 함수를 실행하지 말아라 (모달 꺼지는거 방지)
    e.stopPropagation();
  };

  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div>제작을 완료하시겠습니까?</div>
          <div>주문자에게 보여지는 상태가 변경됩니다.</div>
          <div className={style.modalBtnBox}>
            <div onClick={ModalChangeHandler}>취소</div>
            <div>확인</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAdoptCheckModal;
