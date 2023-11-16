import React from "react";
import style from "./StoreImgModal.module.css";
import { tokenHttp } from "@/api/tokenHttp";
import { useRouter } from "next/router";

interface Props {
  ModalChangeHandler: () => void;
  imageInfo: { id: number; url: string }[];
  UpdateImg: (img: string) => void;
  index: number | null;
}

const StoreImgModal = ({ ModalChangeHandler, imageInfo, UpdateImg, index }: Props) => {
  const router = useRouter();

  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const deleteHandler = () => {
    if (index === null) {
      return;
    }
    const imageIDs = imageInfo[index].id;

    tokenHttp
      .delete(`/s3/delete/store/${imageIDs}`)
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
          router.push("/fllylogin");
        }
      });
  };

  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div className={style.modalMain}>
            <div>이미지를 삭제하시겠습니까?</div>
            <div></div>
          </div>
          <div className={style.modalBtnBox}>
            <div onClick={ModalChangeHandler}>취소</div>
            <div onClick={deleteHandler}>삭제</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StoreImgModal;
