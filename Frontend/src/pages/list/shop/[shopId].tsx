import { log } from "console";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import style from "./ShopInfoMain.module.css";
import ShopLocation from "@/components/list/listBuyer/shopInfo/ShopLocation";
import ShopImg from "@/components/list/listBuyer/shopInfo/ShopImg";
import ShopReview from "@/components/list/listBuyer/shopInfo/ShopReview";

const ShopInfoMain = () => {
  const router = useRouter();

  const shopInfo = {
    shopX: 123,
    shopY: 4342,
    shopName: "아름다운 꽃가게",
    shopLoc: "대전광역시 유성구 학하서로 11 (대전광역시 유성구 덕명동 600-1)",
    shopImg: {
      img1: "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/9ab5e8bb-56f9-4cff-967b-22075b73e37a010_pink_gookhwa.jpg.jpg",
      img2: "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/da3f0e9f-0c1e-45d8-ba34-86e57331687b011_yellow_gookhwa.jpg.jpg",
      img3: "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
    },
  };

  return (
    <div className={style.ShopInfoBack}>
      <div className={style.ShopInfoHeader}>
        <div className={style.headerTitle}>가게정보</div>
      </div>
      <div className={style.ShopInfoMain}>
        <ShopLocation shopInfo={shopInfo} />
        <ShopImg shopImg={shopInfo.shopImg} />
        <ShopReview />
      </div>
    </div>
  );
};

export default ShopInfoMain;
