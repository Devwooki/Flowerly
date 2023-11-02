import React from "react";
import style from "./ShopImg.module.css";

type ShopImgProps = {
  shopImg: string[];
};

const ShopImg = (props: { shopImg: string[] }) => {
  return (
    <div className={style.shopImgMain}>
      <div>대표사진</div>
      <div>대표사진</div>
    </div>
  );
};

export default ShopImg;
