import React, { useEffect, useState } from "react";
import style from "./MypageReviewModal.module.css";
import axios from "axios";
import { ToastErrorMessage, ToastSuccessMessage } from "@/model/toastMessageJHM";
import { tokenHttp } from "@/api/tokenHttp";
import Router from "next/router";

interface Props {
  ModalChangeHandler: () => void;
  $selectId: number;

  UpdateFllyList: () => void;
}

const MypageReviewModal = ({ ModalChangeHandler, $selectId, UpdateFllyList }: Props) => {
  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    //상위 함수를 실행하지 말아라 (모달 꺼지는거 방지)
    e.stopPropagation();
  };

  const [content, setContent] = useState<string>("");

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const SummitBtnHandler = () => {
    console.log("안녕/?");
    tokenHttp
      .post("/review/create", {
        requestId: $selectId,
        content: content,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          ToastSuccessMessage("리뷰가 성공적으로 등록되었습니다.");
          UpdateFllyList();
          ModalChangeHandler();

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
  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div className={style.modalMain}>
            <div>리뷰를 남겨주세요!</div>
            <div>상품에 대해 만족하셨나요? 상품에 대해 리뷰를 남겨주세요</div>
          </div>
          <textarea className={style.modalTextBox} onChange={handleContentChange} />
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
