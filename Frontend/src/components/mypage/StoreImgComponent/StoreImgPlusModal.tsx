import React, { use, useEffect, useRef } from "react";
import style from "./StoreImgPlusModal.module.css";
import { tokenHttp } from "@/api/tokenHttp";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";

interface Props {
  ModalChangeHandler: () => void;

  UpdateImg: (img: string) => void;
  onPlusClick: () => void;
}

const StoreImgPlusModal = ({ ModalChangeHandler, UpdateImg }: Props) => {
  const router = useRouter();
  const [newUrl, setNewUrl] = React.useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fileInputHandler = async () => {
    if (!inputRef.current) return;
    const file: File = inputRef.current.files![0];

    if (!file) {
      return;
    }

    const formData = new FormData();

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    let redirectFile = null;
    if (file) {
      redirectFile = await imageCompression(file, options);
      console.log(redirectFile);
      formData.append("image", redirectFile);
    }

    console.log(formData);

    tokenHttp
      .post("/s3/upload/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          const uploadedUrl = res.data.data[0] as string;
          setNewUrl(uploadedUrl);
          console.log(uploadedUrl);

          if (res.headers.authorization) {
            localStorage.setItem("accessToken", res.headers.authorization);
          }
          ModalChangeHandler();
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
  };

  useEffect(() => {
    if (!newUrl) return;

    const newImageData = {
      imageUrls: [newUrl],
    };

    tokenHttp
      .post("/s3/regist-image", newImageData)
      .then((res) => {
        if (res.data.code === 200) {
          UpdateImg(newUrl);
          console.log(newUrl);
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
  }, [newUrl]);

  return (
    <>
      <div className={style.checkBack}>
        <div className={style.modalBack}>
          <div className={style.modalMain}>
            <div>이미지를 등록해주세요!</div>
            <input type="file" multiple={false} ref={inputRef} />
            <div></div>
          </div>
          <div className={style.modalBtnBox}>
            <div onClick={ModalChangeHandler}>취소</div>

            <div onClick={fileInputHandler}>등록</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreImgPlusModal;
