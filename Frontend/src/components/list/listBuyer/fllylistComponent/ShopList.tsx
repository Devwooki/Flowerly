import React from "react";
import style from "./ShopList.module.css";
import ShopCard from "./ShopCard";

const ShopList = () => {
  return (
    <div className={style.shopListMain}>
      <ShopCard />
      <ShopCard />
      <ShopCard />
      <ShopCard />
      <ShopCard />
      <ShopCard />
      <ShopCard />
      <ShopCard />
    </div>
  );
};

export default ShopList;
