import React, { useEffect } from "react";
import style from "./ShopImg.module.css";
import Image from "next/image";

type ShopImgProps = {
  shopImg: string[];
};

const ShopImg = ({ shopImg }: ShopImgProps) => {
  return (
    <div className={style.shopImgMain}>
      <div className={style.headerTitle}>대표사진</div>
      <div className={style.imgList}>
        {shopImg.map((src, idx) => (
          <Image
            src={src}
            key={src + "-" + idx}
            alt="대표 이미지"
            width={120}
            height={120}
            className={style.imgOne}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopImg;
