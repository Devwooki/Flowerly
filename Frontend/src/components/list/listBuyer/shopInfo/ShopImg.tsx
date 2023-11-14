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
        {shopImg.length > 0 ? (
          shopImg.map((src, idx) => (
            <Image
              src={src}
              key={src + "-" + idx}
              alt="대표 이미지"
              width={120}
              height={120}
              className={style.imgOne}
            />
          ))
        ) : (
          <div className={style.noDataTable}>
            <div className={style.noData}>
              <Image src="/img/etc/no-list-image.png" alt="플리" width={80} height={80} />
            </div>
            <div className={style.noDataText}>대표이미지가 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopImg;
