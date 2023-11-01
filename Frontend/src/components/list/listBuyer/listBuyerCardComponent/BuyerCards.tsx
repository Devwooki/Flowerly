import React from "react";
import style from "./BuyerCards.module.css";
import ProgressBar from "./ProgressBar";
import Image from "next/image";

type BuyerCardsProps = {
  card: BuyerCard;
};

const stateProps = ["입찰", "조율", "주문완료", "제작완료", "픽업/배달완료"];

const BuyerCards = ({ card }: BuyerCardsProps) => {
  const stepNumber = stateProps.indexOf(card.state);

  return (
    <div className={style.cardBox}>
      <ProgressBar currentStep={stepNumber} />
      <div className={style.cardInfo}>
        <Image src={card.img} alt="꽃 이미지" width={150} height={150} />
        <div className={style.InfoText}>
          <div className={style.InfoTextHeader}>상품정보</div>
          <div className={style.infoTable}>
            <div className={style.infoTitle}>상황</div>
            <div className={style.info}>{card.situation}</div>
          </div>
          <div className={style.infoTable}>
            <div className={style.infoTitle}>대상</div>
            <div className={style.info}>{card.target}</div>
          </div>
          <div
            className={style.infoTable}
            style={{ display: "inline-block", marginBottom: "10px" }}
          >
            <div className={style.infoColorTable}>주요색상</div>
            {card.selectedColor.map((color, idx) => {
              return (
                <div
                  key={idx}
                  className={`${style.info} ${style.colorfirst}`}
                  style={{ display: "inline", marginRight: "10px" }}
                >
                  {color}
                </div>
              );
            })}
          </div>
          <div className={style.infoTable}>
            <div className={style.infoTitle}>꽃집</div>
            <div className={`${style.flowerShop}`}>{card.shopName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerCards;
