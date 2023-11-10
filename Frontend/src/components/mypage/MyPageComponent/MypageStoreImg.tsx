import React, { useEffect, useRef, useState } from "react";
import style from "./style/MypageStoreImg.module.css";
import Image from "next/image";

interface MypageStoreImgProps {
  imageUrls: string[];
}

const MypageStoreImg: React.FC<MypageStoreImgProps> = ({ imageUrls }) => {
  const imgBoxRef = useRef<HTMLDivElement>(null);

  //이미지 사이즈 변화
  useEffect(() => {
    if (imgBoxRef.current) {
      let imgBoxWidth = imgBoxRef.current.offsetWidth - 10;
      let imgSize = imgBoxWidth / 3;
      const divElements = imgBoxRef.current.querySelectorAll("div");
      divElements.forEach((div) => {
        div.style.width = imgSize.toFixed() + "px";
        div.style.height = imgSize.toFixed() + "px";
      });
    }
  }, []);

  return (
    <>
      <div className={style.StoreImg}>
        <div>대표 사진</div>

        <div className={style.ImgBox} ref={imgBoxRef}>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <Image src={url} fill alt="대표사진" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MypageStoreImg;
