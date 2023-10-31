import React from "react";
import style from "./BuyerCards.module.css";
import ProgressBar from "./ProgressBar";

type BuyerCardsProps = {
  card: BuyerCard;
};

const stateProps = ["입찰", "조율", "주문완료", "제작완료", "픽업/배달완료"];

const BuyerCards = ({ card }: BuyerCardsProps) => {
  const stepNumber = stateProps.indexOf(card.state);

  return (
    <div className={style.cardBox}>
      <ProgressBar currentStep={stepNumber} />
      <div>{card.img}</div>
      <div className={style.cardInfo}>
        <div>상품정보</div>
        <div>
          <div className={style.infoTitle}>상황</div>
          {card.situation}
        </div>
        <div>
          <div className={style.infoTitle}>대상</div>
          {card.target}
        </div>
        <div>
          <div className={style.infoTitle}>주요색상</div>
          {card.selectedColor}
        </div>
        <div>
          <div className={style.infoTitle}>꽃집</div>
          {card.shopName}
        </div>
      </div>
    </div>
  );
};

export default BuyerCards;
