import React, { useEffect, useState } from "react";
import style from "./BuyerCards.module.css";
import ProgressBar from "./ProgressBar";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { FllylistDiscRecoil } from "@/recoil/kdmRecoil";

type BuyerCardsProps = {
  card: BuyerCard;
};

const stateProps = ["입찰", "조율", "주문완료", "제작완료", "픽업/배달완료"];

const BuyerCards = ({ card }: BuyerCardsProps) => {
  const isClient = typeof window !== "undefined";

  const route = useRouter();
  const stepNumber = stateProps.indexOf(card.state);
  const setCardProps = useSetRecoilState(FllylistDiscRecoil);

  const posFlowerLeft = (step: number) => {
    if (step === 0) {
      return "1%";
    }
    if (step === 1) {
      return "16%";
    }
    if (step === 2) {
      return "34%";
    }
    if (step === 3) {
      return "54%";
    }
    if (step === 4) {
      return "87%";
    }
  };

  const mapColorNameToRGB = (colorName: string) => {
    switch (colorName) {
      case "빨간색":
        return "rgb(219,68,85)";
      case "주황색":
        return "rgb(255,165,0)";
      case "분홍색":
        return "rgb(255,192,203)";
      case "노랑색":
        return "rgb(251,232,112)";
      case "파랑색":
        return "rgb(4,137,221)";
      case "보라색":
        return "rgb(206,146,216)";
      case "흰색":
        return "rgb(255,255,255)";
      default:
        return "black"; // 만약 매핑되지 않는 경우 원래 문자열 반환
    }
  };

  const fllistBtn = (fllyId: number) => {
    setCardProps(card);
    route.push({
      pathname: `/list/buyer/[fllyId]/`,
      query: {
        fllyId: fllyId,
      },
    });
  };

  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (isClient) {
      // 현재의 화면 너비 설정
      setWindowWidth(window.innerWidth);

      // 창 크기가 변경될 때마다 화면 너비 업데이트
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isClient]);

  return (
    <div className={style.cardBox}>
      <div style={{ height: "30px" }}>
        <Image
          src="/img/icon/currentFlower.png"
          alt="현재상태"
          width={40}
          height={40}
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
          <div className={style.infoColorTable}>주요색상</div>
          {card.selectedColor.map((color, idx) => {
            const rgbColor = mapColorNameToRGB(color);
            return (
              <div
                key={idx}
                className={`${style.colorInfo} ${style.colorfirst}`}
                style={{
                  color: isClient && window.innerWidth <= 426 ? rgbColor : "black",
                  backgroundColor: isClient && window.innerWidth <= 426 ? "" : rgbColor,
                }}
              >
                {window.innerWidth <= 426 ? "" : color}
              </div>
            );
          })}
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
