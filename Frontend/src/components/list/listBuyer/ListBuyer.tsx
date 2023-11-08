import React, { useState, useEffect } from "react";
import style from "./ListBuyer.module.css";
import BuyerCardOne from "./listBuyerCardComponent/BuyerCardOne";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { KDMaxios } from "@/api/basicHttp";
import BuyerCards from "./listBuyerCardComponent/BuyerCards";

const ListBuyer = () => {
  // const procesingCards: BuyerCard[] = [
  //   {
  //     fllyId: 1,
  //     state: "입찰",
  //     img: "/img/homeBanner/164_red_phalaenopsis.jpg",
  //     situation: "축하",
  //     target: "연인",
  //     selectedColor: ["분홍색", "파랑색", "보라색"],
  //     shopName: "입찰중",
  //   },
  //   {
  //     fllyId: 2,
  //     state: "조율",
  //     img: "/img/homeBanner/test.webp",
  //     situation: "사랑",
  //     target: "연인",
  //     selectedColor: ["노랑색", "파랑색", "흰색"],
  //     shopName: "입찰중",
  //   },
  //   {
  //     fllyId: 3,
  //     state: "주문완료",
  //     img: "/img/homeBanner/121_pink_gomphrena.jpg",
  //     situation: "선택안함",
  //     target: "부모님 ",
  //     selectedColor: ["주황색", "분홍색", "노랑색"],
  //     shopName: "현욱이네 꼬까게",
  //   },
  //   {
  //     fllyId: 4,
  //     state: "제작완료",
  //     img: "/img/homeBanner/121_pink_gomphrena.jpg",
  //     situation: "선택안함",
  //     target: "부모님 ",
  //     selectedColor: ["주황색", "분홍색", "노랑색"],
  //     shopName: "현욱이네 꼬까게",
  //   },
  //   {
  //     fllyId: 5,
  //     state: "픽업/배달완료",
  //     img: "/img/homeBanner/141_purple_gladiolus.jpg",
  //     situation: "선택안함",
  //     target: "부모님 ",
  //     selectedColor: ["선택안함"],
  //     shopName: "현욱이네 꼬까게",
  //   },
  // ];

  // const procesingCard: BuyerCard[] = [
  //   {
  //     budget: 50000,
  //     color1: "빨간색",
  //     color2: "파란색",
  //     color3: null,
  //     consumer: "수정이는귀여워",
  //     deadline: "2023-11-25 09:30",
  //     fllyId: 1,
  //     flower1: { flowerName: "주황 장미", meaning: "사랑, 첫사랑의 고백" },
  //     flower2: { flowerName: "분홍 장미", meaning: "사랑, 맹세" },
  //     flower3: { flowerName: "노란 장미", meaning: "사랑, 우정" },
  //     imageUrl:
  //       "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/0026c981-2cc8-4abe-b5c1-4a78ab16bfac094_orange_gumuhcho.jpeg.jpeg",
  //     orderType: "픽업",
  //     progress: "픽업/배달완료",
  //     requestAddress: null,
  //     requestContent: "이쁘게 포장해주세요",
  //     situation: "응원",
  //     target: "가족",
  //   },
  // ];

  const { data, isLoading, isFetching, isError } = useQuery<BuyerCard[], AxiosError>(
    ["listBuyerQuery"],
    async () => {
      const res = await KDMaxios.get("api/buyer/my-flly");
      console.log(res.data.data.content);

      return res.data.data.content;
    },
    {
      onError: (error) => {
        console.log("에러 발생했다 임마");
        console.log(error?.response?.status);
      },
      retry: 2,
      cacheTime: 0,
    },
  );

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div className={style.ListBuyerBack}>
      <div className={style.ListBuyerHeader}>
        <div className={style.headerTitle}>진행중인 플리</div>
      </div>
      <div className={style.ListBuyerMain}>
        {/* {data && data.map((card, idx) => <BuyerCards card={card} key={idx} />)} */}
      </div>
    </div>
  );
};

export default ListBuyer;
