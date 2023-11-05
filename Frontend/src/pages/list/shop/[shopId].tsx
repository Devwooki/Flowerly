import { useRouter } from "next/router";
import React, { useEffect } from "react";
import style from "./ShopInfoMain.module.css";
import ShopLocation from "@/components/list/listBuyer/shopInfo/ShopLocation";
import ShopImg from "@/components/list/listBuyer/shopInfo/ShopImg";
import ShopReview from "@/components/list/listBuyer/shopInfo/ShopReview";

const ShopInfoMain = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query); // 전달받은 샵 ID를 Api한테 쓰면 댐
  }, [router.query]);

  const ShopInfoDetail: ShopInfoDetail = {
    shopName: "나이테플라워",
    shopLoc: "대전광역시 중구 대둔산로 384",
    shopImg: [
      "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/9ab5e8bb-56f9-4cff-967b-22075b73e37a010_pink_gookhwa.jpg.jpg",
      "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/da3f0e9f-0c1e-45d8-ba34-86e57331687b011_yellow_gookhwa.jpg.jpg",
      "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/9ab5e8bb-56f9-4cff-967b-22075b73e37a010_pink_gookhwa.jpg.jpg",
      "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/da3f0e9f-0c1e-45d8-ba34-86e57331687b011_yellow_gookhwa.jpg.jpg",
      "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/9ab5e8bb-56f9-4cff-967b-22075b73e37a010_pink_gookhwa.jpg.jpg",
      "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/da3f0e9f-0c1e-45d8-ba34-86e57331687b011_yellow_gookhwa.jpg.jpg",
      "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
    ],
  };

  return (
    <div className={style.ShopInfoBack}>
      <div className={style.ShopInfoHeader}>
        <div className={style.headerTitle}>가게정보</div>
      </div>
      <div className={style.ShopInfoMain}>
        <ShopLocation ShopInfoDetail={ShopInfoDetail} />
        <ShopImg shopImg={ShopInfoDetail.shopImg} />
        <ShopReview />
      </div>
    </div>
  );
};

export default ShopInfoMain;
