import React from "react";
import style from "@/components/flly/fllyUser/checkModal.module.css"
import { useRouter } from "next/router";

interface Props {
  ModalChangeHandler: () => void;
  question: string;
  explain: string;
  routerHref: string;
}

const CheckModal = ({ ModalChangeHandler, question, explain, routerHref }: Props) => {
  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    //상위 함수를 실행하지 말아라 (모달 꺼지는거 방지)
    e.stopPropagation();
  };
  const router = useRouter();

  const submitBtn = () => {
    router.push(routerHref);
  }

  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div className={style.question}>{question}</div>
          <div className={style.explain}>{explain}</div>
          <div className={style.modalBtnBox}>
            <div onClick={ModalChangeHandler}>취소</div>
            <div onClick={submitBtn}>확인</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
