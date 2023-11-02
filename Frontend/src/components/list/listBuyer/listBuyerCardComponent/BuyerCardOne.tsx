import React from "react";
import style from "./BuyerCardOne.module.css";

type BuyerCardOneProps = {
  card: BuyerCard;
};

const BuyerCardOne = ({ card }: BuyerCardOneProps) => {
  return (
    <div className={style.cardBox}>
      <div>{card.state}</div>
      <div>{card.img}</div>
      <div>{card.situation}</div>
      <div>{card.target}</div>
      <div>{card.selectedColor}</div>
      <div>{card.shopName}</div>
    </div>
  );
};

export default BuyerCardOne;
