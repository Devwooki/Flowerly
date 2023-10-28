import React from "react";
import style from "./FllySellerCard.module.css";
import Image from "next/image";

const FllySellerCard = () => {
  return (
    <>
      <div className={style.back}>
        <div className={style.cardMain}>
          <div className={style.cardMainImg} style={{ backgroundImage: "url(/test/vertical.jpg)" }}>
            <div className={style.cardMainImgInfo}>조율중</div>
          </div>
          <div className={style.cardMainDetail}>
            <div>
              <Image src="/img/icon/flower-icon.png" alt="꽃" width={22} height={22}></Image>
              <span>파란수국, 분홍 수국</span>
            </div>
            <div>
              <Image src="/img/icon/money-icon.png" alt="돈" width={22} height={22}></Image>
              <span>30,000 원</span>
            </div>
            <div>
              <Image src="/img/icon/time-icon.png" alt="마감" width={22} height={22}></Image>
              <span>~ 23.10.20 18:00</span>
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
