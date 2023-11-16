import React, { useEffect, useState } from "react";
import style from "./StoreImgModal.module.css";
import { tokenHttp } from "@/api/tokenHttp";
import { useRouter } from "next/router";
import Image from "next/image";
import { ImageInfo } from "@/recoil/memberInfoRecoil";
interface Props {
  ModalChangeHandler: () => void;
  imageInfos: ImageInfo[];
  DeleteImg: (id: number) => void;
  index: number | null;
}

const StoreImgModal = ({ ModalChangeHandler, imageInfos, DeleteImg, index }: Props) => {
  const [imgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    console.log(index);
    if (index !== null) {
      setImgUrl(imageInfos[index].imageUrl);
    }
  }, []);

  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const deleteHandler = () => {
    if (index === null) {
      return;
    }
    const imageIDs = imageInfos[index].storeImageId;

    tokenHttp
      .delete(`/s3/delete-image/${imageIDs}`)
      .then((res) => {
        if (res.data.code === 200) {
          DeleteImg(imageIDs);
          ModalChangeHandler();
          if (res.headers.authorization) {
            localStorage.setItem("accessToken", res.headers.authorization);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div className={style.modalMain}>
            <div>이미지를 삭제하시겠습니까?</div>
            <div>삭제후 복구하실수 없습니다</div>
          </div>
          <div className={style.imgBox}>
            {imgUrl && <Image src={imgUrl} width={200} height={200} alt="삭제이미지" />}
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
