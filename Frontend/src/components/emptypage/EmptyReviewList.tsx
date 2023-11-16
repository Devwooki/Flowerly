import React from "react";
import Image from "next/image";
import style from "./EmptyReviewList.module.css";

const EmptyReviewList = () => {
  return (
    <div>
      <div className={style.emptyBack}>
        <Image
          src="/img/etc/no-selection-image.png"
          alt="empty"
          width={200}
          height={200}
          className={style.emptyImg}
        />
        <div>리뷰 내역이 없습니다.</div>
      </div>
    </div>
  );
};
export default EmptyReviewList;
