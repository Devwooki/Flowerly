import React from "react";
import style from "./ShopList.module.css";
import ShopCard from "./ShopCard";
import { motion } from "framer-motion";

type ShopListProps = {
  shopList: storeContent[];
};

const ShopList = ({ shopList }: ShopListProps) => {
  console.log("shopList", shopList);

  return (
    <div className={style.shopListMain}>
      {shopList.length > 0 ? (
        shopList.map((shopInfo) => (
          <ShopCard
            shopInfo={shopInfo}
            key={shopInfo.participant.fllyParticipationId + shopInfo.storeInfoDto.storeInfoId}
          />
        ))
      ) : (
        <div>텅</div>
      )}
    </div>
  );
};

export default ShopList;
