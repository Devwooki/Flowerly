import React from "react";
import style from "./FllySeller.module.css";

import FllySellerCard from "./fllySellerCardComponent/FllySellerCard";

const FllySeller = () => {
  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.header}>
          <div className={style.headerTitle}>주변 플리 목록</div>
          <div className={style.headerSortBox}>
            <select className={style.headerSortBoxSelect}>
              <option>최신순</option>
              <option>마감순</option>
            </select>
          </div>
        </div>
        <div className={style.mainBox}>
          <FllySellerCard />
          <FllySellerCard />
          <FllySellerCard />
          <FllySellerCard />
          <FllySellerCard />
          <FllySellerCard />
          <FllySellerCard />
          <FllySellerCard />
        </div>
      </div>
    </>
  );
};

export default FllySeller;
