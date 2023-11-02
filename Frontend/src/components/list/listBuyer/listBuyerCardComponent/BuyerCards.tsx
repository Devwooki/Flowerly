import React, { useEffect } from "react";
import style from "./BuyerCards.module.css";
import ProgressBar from "./ProgressBar";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FllylistDiscRecoil } from "@/recoil/kdmRecoil";

type BuyerCardsProps = {
  card: BuyerCard;
};

const stateProps = ["입찰", "조율", "주문완료", "제작완료", "픽업/배달완료"];

const BuyerCards = ({ card }: BuyerCardsProps) => {
  const route = useRouter();
  const stepNumber = stateProps.indexOf(card.state);
  const setCardProps = useSetRecoilState(FllylistDiscRecoil);

  const posFlowerLeft = (step: number) => {
    if (step === 0) {
      return "0";
    }
    if (step === 1) {
      return "16%";
    }
    if (step === 2) {
      return "32%";
    }
    if (step === 3) {
      return "53%";
    }
    if (step === 4) {
      return "86%";
    }
  };

  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {
  //     setCardProps(card);
  //   };

  //   route.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     route.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [card]);

  const fllistBtn = (fllyId: number) => {
    setCardProps(card);
    route.push({
      pathname: `/list/buyer/[fllyId]/`,
      query: {
        fllyId: fllyId,
      },
    });
  };

  return (
    <div className={style.cardBox}>
      <div style={{ height: "40px" }}>
        <Image
          src="/img/icon/currentFlower.png"
          alt="현재상태"
          width={50}
          height={50}
          className={style.currentFlower}
          style={{ marginLeft: posFlowerLeft(stepNumber) }}
        />
      </div>
      <ProgressBar currentStep={stepNumber} />
      <div className={style.cardInfo}>
        <Image src={card.img} alt="꽃 이미지" width={150} height={150} />
        <div className={style.InfoText}>
          <div className={style.infoTitle}>상품정보</div>
          <div className={style.infoTable}>
            <div className={style.infoTitle}>상황</div>
            <div className={style.info}>{card.situation}</div>
          </div>
          <div className={style.infoTable}>
            <div className={style.infoTitle}>대상</div>
            <div className={style.info}>{card.target}</div>
          </div>
          <div className={style.infoTable} style={{ display: "inline-block" }}>
            <div className={style.infoColorTable}>주요색상</div>
            {card.selectedColor.map((color, idx) => {
              return (
                <div
                  key={idx}
                  className={`${style.info} ${style.colorfirst}`}
                  style={{ display: "inline", marginRight: "10px" }}
                >
                  {color}
                </div>
              );
            })}
          </div>
          <div className={style.infoTable}>
            <div className={style.infoTitle}>꽃집</div>
            <div className={`${style.flowerShop}`}>{card.shopName}</div>
          </div>
        </div>
      </div>
      <div className={style.cardBtn}>
        <button className={style.fllistBtn} onClick={() => fllistBtn(card.fllyId)}>
          플리스트
        </button>
        <button className={style.cancelBtn} onClick={() => console.log("취소")}>
          취소하기
        </button>
      </div>
    </div>
  );
};

export default BuyerCards;
