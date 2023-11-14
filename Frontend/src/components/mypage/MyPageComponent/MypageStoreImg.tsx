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

  // array.from() 함수를 사용하여 길이가 3인 배열을 만들고 imageUrls 배열의 인덱스에 값이 있는지 확인
  return (
    <>
      <div className={style.StoreImg}>
        <div>대표 사진</div>

        <div className={style.ImgBox} ref={imgBoxRef}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              {imageUrls[index] ? (
                <Image src={imageUrls[index]} fill alt="대표사진" />
              ) : (
                <Image src="/img/etc/NoImg.png" fill alt="NoImg" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MypageStoreImg;
