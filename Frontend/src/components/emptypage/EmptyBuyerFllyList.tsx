import React from "react";
import style from "./EmptyBuyerFllyList.module.css";
import Image from "next/image";
const EmptyBuyerFllyList = () => {
  return (
    <div>
      <div className={style.emptyBack}>
        <Image
          src="/img/etc/no-review-image.png"
          alt="empty"
          width={200}
          height={200}
          className={style.emptyImg}
        />
        <div>플리 내역이 없습니다.</div>
      </div>
    </div>
  );
};
export default EmptyBuyerFllyList;
