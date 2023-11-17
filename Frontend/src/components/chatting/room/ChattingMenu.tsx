import { useRef } from "react";
import axios from "axios";
import style from "./style/ChattingMenu.module.css";
import Image from "next/image";
import imageCompression from "browser-image-compression";

import { useRecoilValue } from "recoil";
import { memberInfoState } from "@/recoil/memberInfoRecoil";
import { useRouter } from "next/router";
import { tokenHttp } from "@/api/chattingTokenHttp";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

type ChattingMenuProps = {
  sendOrderFormHandler: Function;
  sendImgHandler: Function;
  modalHandler: Function;
};

const ChattingMenu: React.FC<ChattingMenuProps> = ({
  sendOrderFormHandler,
  sendImgHandler,
  modalHandler,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const memberInfo = useRecoilValue(memberInfoState);
  const router = useRouter();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const formData = {
        image: await imageCompression(image, options),
      };
      tokenHttp
        .post(`/s3/upload/chat`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.code === 200) {
            sendImgHandler(response.data.data);
            //요거 필수!! (엑세스 토큰 만료로 재발급 받았다면 바꿔줘!! )
            if (response.headers.authorization) {
              localStorage.setItem("accessToken", response.headers.authorization);
            }
          } else {
            ToastErrorMessage("사진 전송에 실패하였습니다.");
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            router.push("/fllylogin");
          }
        });
    } catch (error) {
      // console.log(error);
    }
  };

  //이미지버튼 클릭시 발생 핸들러
  const imgInputClickHandler = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return (
    <>
      <div className={style.menuMain}>
        <div className={style.menuItem}>
          <div className={style.menuIcon} onClick={imgInputClickHandler}>
            <Image
              className={style.icon}
              src="/img/icon/chatting-photo.png"
              width={28}
              height={28}
              alt="사진"
            />
            <input
              type="file"
              accept=".jpg, .png, .heic"
              className={style.imgInput}
              ref={inputFileRef}
              onChange={uploadImage}
            />
          </div>
          <div className={style.menuName}>사진</div>
        </div>
        {memberInfo.role == "SELLER" && (
          <div className={style.menuItem}>
            <div
              className={style.menuIcon}
              onClick={() => {
                sendOrderFormHandler();
              }}
            >
              <Image
                className={style.icon}
                src="/img/icon/chatting-order.png"
                width={30}
                height={30}
                alt="주문 양식"
              />
            </div>
            <div className={style.menuName}>주문 양식</div>
          </div>
        )}
        <div className={style.menuItem}>
          <div className={style.menuIcon}>
            <Image
              className={style.icon}
              src="/img/icon/chatting-report.png"
              width={32}
              height={32}
              alt="신고"
              onClick={() => {
                modalHandler("REPORT", true);
              }}
            />
          </div>
          <div className={style.menuName}>신고</div>
        </div>
      </div>
    </>
  );
};

export default ChattingMenu;
