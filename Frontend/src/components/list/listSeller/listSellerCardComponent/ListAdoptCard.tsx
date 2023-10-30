import React from "react";
import style from "./ListAdoptCard.module.css";
import Image from "next/image";

const ListAdoptCard = () => {
  const urlSrc = "/img/icon/flower-bouquet.png";

  return (
    <>
      <div className={style.cardBack}>
        <div className={style.cardHeader}>
          <div className={style.cardHeaderImg}>
            <div style={{ backgroundImage: `url(${"/test/test-flower-img.png"})` }} />
          </div>
          <div className={style.cardHeaderInfo}></div>
        </div>
        <div className={style.cardMain}>
          <div className={style.cardMainState}>
            <Image src={urlSrc} width={16} height={16} alt="상태이미지"></Image>
            <span>제작중</span>
          </div>
          <div>완료하기</div>
        </div>
      </div>
    </>
  );
};

export default ListAdoptCard;
