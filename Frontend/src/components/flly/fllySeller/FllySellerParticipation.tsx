import React, { useEffect, useRef, useState } from "react";
import style from "./style/FllySellerParticipation.module.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { ToastErrorMessage, ToastSuccessMessage } from "@/model/toastMessageJHM";
import axios from "axios";

const FllySellerParticipation = () => {
  const [userImgSrc, setUserImgSrc] = useState<string>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const imgBackgrondRef = useRef<HTMLDivElement>(null);
  const fllyId = useParams();
  const router = useRouter();

  const [money, setMoney] = useState<string>();
  const [content, setContent] = useState<String>();
  const [fileInfo, setFileInfo] = useState<File>();

  //이미지버튼 클릭시 발생 핸들러
  const imgChangBtnClickHandler = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  useEffect(() => {
    console.log(fllyId);
  }, []);

  //이미지 변경시 미리보기 이벤트 발생
  const changeImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf|JPG|JPEG|PNG|GIF|BMP|PDF)$/;
    const imgValue = e.target.value;

    if (!imgValue.match(fileForm)) {
      //   ToastErrorMessage("이미지 파일만 업로드 가능");
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

  useEffect(() => {
    if (userImgSrc != null || userImgSrc == "") {
      if (imgBackgrondRef.current && userImgSrc) {
        // backgroundImage 스타일을 안전하게 설정합니다.
        imgBackgrondRef.current.style.backgroundImage = `url(${userImgSrc})`;
      }
    }
  }, [userImgSrc]);

  const cancelHandler = () => {
    router.push("/flly/");
  };

  const moneyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(e.target.value);
  };

  const textareaChangeHandelr = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const submitHandler = () => {
    if (!fileInfo) {
      ToastErrorMessage("예시 꽃다발 사진을 올려주세요!");
      return;
    }
    if (!money) {
      ToastErrorMessage("제시 금액을 입력해주세요!");
      return;
    }
    if (!content) {
      ToastErrorMessage("꽃다발에 대한 간략 설명을 적어주세요!");
      return;
    }

    console.log(fileInfo);
    const formData = new FormData();
    formData.append("file", fileInfo);
    formData.append("fllyId", fllyId + "");
    formData.append("content", content.toString());
    formData.append("offerPrice", money);

    //inputFileRef.current.files[0];

    axios
      .post("https://flower-ly.co.kr/seller/flly/participate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.code == 200) {
          router.push("/flly");
          ToastSuccessMessage("성공적으로 참여하였습니다");
        } else {
          ToastErrorMessage(res.data.message);
        }
      });
  };

  return (
    <>
      <div className={style.participationBack}>
        <div className={style.participationHeader}>
          <Image
            src="/img/btn/left-btn.png"
            alt="뒤로가기"
            width={13}
            height={20}
            onClick={() => {
              router.back();
            }}
          />

          <div className={style.headerTitle}>플리 참여하기</div>
        </div>
        <div className={style.participationMain}>
          <div className={style.mainImgBox} ref={imgBackgrondRef} onClick={imgChangBtnClickHandler}>
            <input
              type="file"
              ref={inputFileRef}
              onChange={changeImgHandler}
              accept="image/*"
            ></input>
            {!userImgSrc ? (
              <Image
                src="/img/btn/img-select-btn.png"
                alt="이미지 선택"
                width={150}
                height={70}
              ></Image>
            ) : null}
          </div>
          <div className={style.mainInfoBox}>
            <div>제시 금액</div>
            <div className={style.mainInfoBoxMoneyBox}>
              <input type="number" onChange={moneyChangeHandler} />
              <div>원</div>
            </div>
            <div>설명</div>
            <div className={style.mainInfoBoxTextBox}>
              <textarea onChange={textareaChangeHandelr}></textarea>
            </div>
          </div>
          <div className={style.mainInfoBoxBtnBox}>
            <div className={style.cancelBtn} onClick={cancelHandler}>
              취소
            </div>
            <div className={style.submitBtn} onClick={submitHandler}>
              확인
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllySellerParticipation;
