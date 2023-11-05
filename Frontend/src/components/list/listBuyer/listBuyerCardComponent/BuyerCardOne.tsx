import React from "react";
import style from "./BuyerCardOne.module.css";
import ProgressBar from "./ProgressBar";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { FllylistDiscRecoil } from "@/recoil/kdmRecoil";

type BuyerCardOneProps = {
  card: BuyerCard;
};

const stateProps = ["입찰", "조율", "주문완료", "제작완료", "픽업/배달완료"];

const BuyerCardOne = ({ card }: BuyerCardOneProps) => {
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
          width={45}
          height={45}
          className={style.currentFlower}
          style={{ marginLeft: posFlowerLeft(stepNumber) }}
        />
      </div>
      <ProgressBar currentStep={stepNumber} />
      <div className={style.cardInfo}>
        <div className={style.cardImgBox}>
          <Image
            src="https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg"
            alt="꽃 이미지"
            fill
            priority
          />
        </div>
        <div className={style.infoText}>
          <div className={style.infoTitle}>상품정보</div>
          <div className={style.infoTable}>
            <div className={style.infoTitle}>상황</div>
            <div className={style.info}>{card.situation}</div>
          </div>
          <div className={style.infoTable}>
            <div className={style.infoTitle}>대상</div>
            <div className={style.info}>{card.target}</div>
          </div>
          <div className={style.infoColorTable}>
            <div>주요색상</div>
            {card.selectedColor.map((color, idx) => {
              return (
                <div key={idx} className={`${style.colorInfo} ${style.colorfirst}`}>
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

export default BuyerCardOne;
