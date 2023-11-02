import React from "react";
import ShopList from "./ShopList";
import Disc from "./Disc";
import style from "./Disc.module.css";

type FllyListMainProps = {
  card: BuyerCard;
};

const FllyListMain = ({ card }: FllyListMainProps) => {
  return (
    <div className={style.fllyListMain}>
      <Disc card={card} />
      <ShopList />
    </div>
  );
};

export default FllyListMain;
