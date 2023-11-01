import React, { useEffect, useState } from "react";
import style from "./FllySellerCard.module.css";
import Image from "next/image";

interface FllyNearType {
  fllyId: number;
  flowerName1: String;
  flowerName2: String;
  flowerName3: String;
  imageUrl: String;
  progress: String;
  deadline: String;
  budget: number;
}

const FllySellerCard = ({ $FllyDeliveryNear }: { $FllyDeliveryNear: FllyNearType }) => {
  return (
    <>
      <div className={style.back}>
        <div className={style.cardMain}>
          <div
            className={style.cardMainImg}
            style={{ backgroundImage: `url(${$FllyDeliveryNear.imageUrl})` }}
          >
            <div className={style.cardMainImgInfo}>{$FllyDeliveryNear.progress}중</div>
          </div>
          <div className={style.cardMainDetail}>
            <div>
              <Image src="/img/icon/seller-flower.png" alt="꽃" width={22} height={22}></Image>
              <span>
                {$FllyDeliveryNear.flowerName1}, {$FllyDeliveryNear.flowerName2},{" "}
                {$FllyDeliveryNear.flowerName3}
              </span>
            </div>
            <div>
              <Image src="/img/icon/seller-money.png" alt="돈" width={22} height={22}></Image>
              <span>{$FllyDeliveryNear.budget} 원</span>
            </div>
            <div>
              <Image src="/img/icon/seller-time.png" alt="마감" width={22} height={22}></Image>
              <span>~ {$FllyDeliveryNear.deadline}</span>
            </div>
            <div>
              <button>참여하기</button>
            </div>
          </div>
        </div>
        <div className={style.cardfooter}>자세히 보기</div>
      </div>
    </>
  );
};

export default FllySellerCard;
