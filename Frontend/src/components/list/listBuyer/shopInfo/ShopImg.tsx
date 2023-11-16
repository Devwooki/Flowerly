import React, { useEffect, useState } from "react";
import style from "./ShopImg.module.css";
import Image from "next/image";

type ShopImgProps = {
  shopImg: string[];
};
type chmod = {
  id: number;
  url: string;
};
const ShopImg = ({ shopImg }: ShopImgProps) => {
  const [ParsedImages, setParsedImages] = useState<chmod[]>();

  useEffect(() => {
    const images = shopImg.map((imageUrl) => {
      const parts = imageUrl.split("_");
      const id = parseInt(parts[0], 10);
      const url = parts.slice(1).join("_"); // 뒤에 또 발견되는 밑줄을 모두 "url"로 처리

      return { id, url };
    });
    setParsedImages(images);
  }, [shopImg]);

  return (
    <div className={style.shopImgMain}>
      <div className={style.headerTitle}>대표사진</div>
      <div className={style.imgList}>
        {ParsedImages && ParsedImages.length > 0 ? (
          ParsedImages.map((src, idx) => (
            <Image
              src={src.url}
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
