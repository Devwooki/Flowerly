import React, { useState, useEffect } from "react";
import style from "./ListBuyer.module.css";
import BuyerCardOne from "./listBuyerCardComponent/BuyerCardOne";
import BuyerCards from "./listBuyerCardComponent/BuyerCards";

const ListBuyer = () => {
  const procesingCard: BuyerCard[] = [
    {
      fllyId: 1,
      state: "입찰",
      img: "/img/homeBanner/164_red_phalaenopsis.jpg",
      situation: "축하",
      target: "연인",
      selectedColor: ["분홍", "파랑", "보라"],
      shopName: "현욱이네 꼬까게",
    },
    {
      fllyId: 2,
      state: "조율",
      img: "/img/homeBanner/test.webp",
      situation: "사랑",
      target: "연인",
      selectedColor: ["노랑", "파랑", "흰색"],
      shopName: "기여니는 힘두러",
    },
    {
      fllyId: 3,
      state: "주문완료",
      img: "/img/homeBanner/121_pink_gomphrena.jpg",
      situation: "선택안함",
      target: "부모님 ",
      selectedColor: ["주황", "분홍", "노랑"],
      shopName: "현욱이네 꼬까게",
    },
    {
      fllyId: 4,
      state: "제작완료",
      img: "/img/homeBanner/121_pink_gomphrena.jpg",
      situation: "선택안함",
      target: "부모님 ",
      selectedColor: ["주황", "분홍", "노랑"],
      shopName: "현욱이네 꼬까게",
    },
    {
      fllyId: 5,
      state: "픽업/배달완료",
      img: "/img/homeBanner/141_purple_gladiolus.jpg",
      situation: "선택안함",
      target: "부모님 ",
      selectedColor: ["주황", "분홍", "노랑"],
      shopName: "현욱이네 꼬까게",
    },
  ];

  return (
    <div className={style.ListBuyerBack}>
      <div className={style.ListBuyerHeader}>
        <div className={style.headerTitle}>진행중인 플리</div>
      </div>
      <div className={style.ListBuyerMain}>
        {procesingCard.length === 1 ? (
          <BuyerCardOne card={procesingCard[0]} />
        ) : (
          procesingCard.map((card, idx) => <BuyerCards card={card} key={idx} />)
        )}
      </div>
    </div>
  );
};

export default ListBuyer;
