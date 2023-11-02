import React, { useState } from "react";
import style from "./ListAdoptCard.module.css";
import Image from "next/image";

interface adoptType {
  requestId: number;
  orderName: string;
  phoneNumber: string;
  orderType: string;
  deliveryPickupTime: string;
  fllyId: number;
  progress: string;
  imageUrl: string;
}

interface Props {
  ModalChangeHandler: () => void;
  $adoptInfo: adoptType;
  SelectIdChangeHandler: (fllyId: number, index: number) => void;
  $index: number;
}

const ListAdoptCard = ({
  ModalChangeHandler,
  SelectIdChangeHandler,
  $adoptInfo,
  $index,
}: Props) => {
  const urlSrc = "/img/icon/flower-bouquet.png";

  const btnClickHandler = () => {
    SelectIdChangeHandler($adoptInfo.fllyId, $index);
    ModalChangeHandler();
  };

  return (
    <>
      {$adoptInfo.progress !== "픽업/배달완료" ? (
        <div className={style.cardBack}>
          <div className={style.cardHeader}>
            <div className={style.cardHeaderImg}>
              <div style={{ backgroundImage: `url(${$adoptInfo.imageUrl})` }} />
            </div>
            <div className={style.cardHeaderInfoBox}>
              <div className={style.cardHeaderInfo}>
                <div>
                  <Image src="/img/icon/seller-user.png" width={18} height={18} alt="상태이미지" />
                  <div>{$adoptInfo.orderName}</div>
                </div>
                <div>
                  <Image src="/img/icon/seller-phon.png" width={18} height={18} alt="상태이미지" />
                  <div>{$adoptInfo.phoneNumber}</div>
                </div>
                <div>
                  <Image
                    src="/img/icon/seller-forward.png"
                    width={18}
                    height={18}
                    alt="상태이미지"
                  />
                  <div>{$adoptInfo.orderType}</div>
                </div>
                <div>
                  <Image src="/img/icon/seller-time.png" width={18} height={18} alt="상태이미지" />
                  <div>{$adoptInfo.deliveryPickupTime}</div>
                </div>
              </div>
              <div>
                주문서 보기<span> &gt;</span>
              </div>
            </div>
          </div>
          <div className={style.cardMain}>
            <div className={style.cardMainState}>
              <Image src={urlSrc} width={16} height={16} alt="상태이미지"></Image>
              <span>{$adoptInfo.progress}</span>
            </div>
            <div className={style.cardFinshBtn} onClick={btnClickHandler}>
              완료하기
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ListAdoptCard;
