import React from "react";
import style from "./StoreImgModal.module.css";
import { tokenHttp } from "@/api/tokenHttp";
import Router from "next/router";

interface Props {
  ModalChangeHandler: () => void;
  $selectImgId: number;
  UpdateImg: (img: string) => void;
}

const StoreImgModal = ({ ModalChangeHandler, $selectImgId, UpdateImg }: Props) => {
  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // 이미지 삭제하기
  const updateHandler = () => {
    tokenHttp
      .put("/s3/update/store")
      .then((res) => {
        if (res.data.code === 200) {
          UpdateImg("");
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
          <div>이미지를 수정하시겠습니까?</div>
          <div></div>
          <div className={style.modalBtnBox}>
            <div onClick={updateHandler}>삭제</div>
            <div onClick={updateHandler}>수정</div>
          </div>
        </div>
      </div>
      s
    </>
  );
};
export default StoreImgModal;
