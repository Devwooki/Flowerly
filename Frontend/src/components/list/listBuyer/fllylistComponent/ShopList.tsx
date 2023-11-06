import React from "react";
import style from "./ShopList.module.css";
import ShopCard from "./ShopCard";

type ShopListProps = {
  shopList: ShopInfo[];
};

const ShopList = ({ shopList }: ShopListProps) => {
  return (
    <div className={style.shopListMain}>
      {shopList.map((shopInfo) => (
        <ShopCard shopInfo={shopInfo} key={shopInfo.shopId} />
      ))}
    </div>
  );
};

export default ShopList;
