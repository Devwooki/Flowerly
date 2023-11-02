import React, { useEffect, useRef, useState } from "react";
import style from "./style/FllySellerParticipation.module.css";
import Image from "next/image";

const FllySellerParticipation = () => {
  const [userImgSrc, setUserImgSrc] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const imgBackgrondRef = useRef<HTMLDivElement>(null);

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
      //   ToastErrorMessage("이미지 파일만 업로드 가능");
      return;
    }

    if (e.target.files && e.target.files.length > 0) {
      const imgFile = e.target.files[0];

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

  return (
    <>
      <div className={style.participationBack}>
        <div className={style.participationHeader}>
          <Image src="/img/btn/left-btn.png" alt="뒤로가기" width={13} height={20} />

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
            {userImgSrc === null || userImgSrc === "" ? (
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
              <input type="text" />
              <div>원</div>
            </div>
            <div>설명</div>
            <div className={style.mainInfoBoxTextBox}>
              <textarea></textarea>
            </div>
          </div>
          <div className={style.mainInfoBoxBtnBox}>
            <div className={style.cancelBtn}>취소</div>
            <div className={style.submitBtn}>확인</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllySellerParticipation;
