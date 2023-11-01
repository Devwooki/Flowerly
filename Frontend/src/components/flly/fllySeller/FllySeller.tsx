import React, { useEffect, useState } from "react";
import style from "./style/FllySeller.module.css";

import FllySellerCard from "./fllySellerCardComponent/FllySellerCard";
import axios from "axios";

interface FllyNearType {
  fllyId: Number;
  flowerName1: String;
  flowerName2: String;
  flowerName3: String;
  imageUrl: String;
  progress: String;
  deadLine: Date;
  budget: Number;
}

const FllySeller = () => {
  const [nearFllyList, setNearFllyList] = useState<FllyNearType[]>([]);

  const axiosHandelr = () => {
    axios
      .get("https://flower-ly.co.kr/api/seller/near")
      .then((res) => {
        const rData = res.data;
        setNearFllyList(rData.data);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosHandelr();
  }, []);

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
