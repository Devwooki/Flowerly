import React from "react";
import style from "./StoreImgPlusModal.module.css";
import { tokenHttp } from "@/api/tokenHttp";
import { useRouter } from "next/router";

interface Props {
  ModalChangeHandler: () => void;

  UpdateImg: (img: string) => void;
  onPlusClick: () => void;
}

const StoreImgPlusModal = ({ ModalChangeHandler, UpdateImg }: Props) => {
  const router = useRouter();
  const [newUrl, setNewUrl] = React.useState("");

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: File[] = Array.from(e.target.files || []);

    if (fileList.length === 0) {
      return;
    }

    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append("image", file);
    });

    tokenHttp
      .post("/s3/upload/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          const uploadedUrl = res.data.data[0] as string;
          setNewUrl(uploadedUrl);
          console.log(uploadedUrl);

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

  const uploadImage = () => {
    if (!newUrl) return;

    const newImageData = {
      imageUrls: [newUrl],
    };

    tokenHttp
      .post("/s3/regist-image", newImageData)
      .then((res) => {
        if (res.data.code === 200) {
          UpdateImg(newUrl);
          if (res.headers.authorization) {
            localStorage.setItem("accessToken", res.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
  };

  return (
    <>
      <div className={style.checkBack}>
        <div className={style.modalBack}>
          <div className={style.modalMain}>
            <div>이미지를 등록해주세요!</div>
            <input type="file" onChange={fileInputHandler} multiple={false} />
            <div></div>
          </div>
          <div className={style.modalBtnBox}>
            <div onClick={ModalChangeHandler}>취소</div>

            <div onClick={uploadImage}>등록</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreImgPlusModal;
