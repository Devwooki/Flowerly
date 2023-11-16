import React, { use, useEffect, useRef, useState } from "react";
import style from "./StoreImgPlusModal.module.css";
import { tokenHttp } from "@/api/tokenHttp";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { ToastErrorMessage } from "@/model/toastMessageJHM";
import Image from "next/image";

interface Props {
  ModalChangeHandler: () => void;

  UpdateImg: (img: string) => void;
  onPlusClick: () => void;
}

const StoreImgPlusModal = ({ ModalChangeHandler, UpdateImg }: Props) => {
  const router = useRouter();
  const [newUrl, setNewUrl] = React.useState("");

  //여러번 클릭안되게 하기위한 로직
  const [debouncedClick, setDebouncedClick] = useState<boolean>(true);

  const [userImgSrc, setUserImgSrc] = useState<string>();
  const [fileInfo, setFileInfo] = useState<File>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  //이미지버튼 클릭시 발생 핸들러
  const imgChangBtnClickHandler = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  //이미지 변경시 미리보기 이벤트 발생
  const changeImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf|JPG|JPEG|PNG|GIF|BMP|PDF)$/;
    const imgValue = e.target.value;

    if (!imgValue.match(fileForm)) {
      ToastErrorMessage("이미지 파일만 업로드 가능");
      return;
    }

    if (e.target.files && e.target.files.length > 0) {
      const imgFile = e.target.files[0];
      setFileInfo(imgFile);

      if (imgFile) {
        const render = new FileReader();
        render.readAsDataURL(imgFile);

        render.onload = () => {
          setUserImgSrc(render.result as string);
        };
      }
    }
  };

  const fileInputHandler = async () => {
    if (!fileInfo || !debouncedClick) {
      ToastErrorMessage("이미지 파일을 업로드 해주세요");
      return;
    }
    setDebouncedClick(false);

    const formData = new FormData();

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    let redirectFile = null;
    if (fileInfo) {
      redirectFile = await imageCompression(fileInfo, options);
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
          ModalChangeHandler();
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
            <div>아래 이미지를 클릭해주세요</div>
            <div className={style.imgBox}>
              <Image
                src={userImgSrc ? userImgSrc : "/img/etc/NoImg.png"}
                width={200}
                height={200}
                alt=""
                onClick={imgChangBtnClickHandler}
              ></Image>
              <input
                type="file"
                multiple={false}
                ref={inputFileRef}
                onChange={changeImgHandler}
                accept="image/*"
              />
            </div>
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
