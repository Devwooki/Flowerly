import React from "react";
import ShopList from "./ShopList";
import Disc from "./Disc";
import style from "./Disc.module.css";

type FllyListMainProps = {
  card: BuyerCardPlus;
  shopList: ShopInfo[];
};

const FllyListMain = ({ card, shopList }: FllyListMainProps) => {
  console.log(card);

  return (
    <div className={style.fllyListMain}>
      <Disc card={card} />
      <ShopList shopList={shopList} />
    </div>
  );
};

export default FllyListMain;
