import React from "react";
import style from "./EmptySellerFllyList.module.css";
import Image from "next/image";

const EmptySellerFllyList = () => {
  return (
    <div>
      <div className={style.emptyBack}>
        <Image
          src="/img/etc/no-participation-image.png"
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
export default EmptySellerFllyList;
