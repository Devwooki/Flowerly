import React from "react";
import ShopList from "./ShopList";
import Disc from "./Disc";

type FllyListMainProps = {
  card: BuyerCard;
};

const FllyListMain = ({ card }: FllyListMainProps) => {
  return (
    <>
      <Disc card={card} />
      <ShopList />
    </>
  );
};

export default FllyListMain;
