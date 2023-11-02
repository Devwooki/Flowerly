import { log } from "console";
import React, { useState } from "react";
import style from "./Disc.module.css";
import Image from "next/image";

type DiscProps = {
  card: BuyerCard;
};

const Disc = ({ card }: DiscProps) => {
  const [moreBtn, setMoreBtn] = useState(false);

  const handlerMoreBtn = () => {
    setMoreBtn((pre) => !pre);
    console.log(moreBtn);
  };

  return (
    <div className={style.discMain}>
      <div className={style.discMainShortUp}>
        <Image src={card.img} alt="시안 이미지" width={120} height={120}></Image>
        <div className={style.discText}>
          <div className={style.discTable}>
            <div>예산</div>
            <div>25,000원</div>
          </div>
          <div className={style.discTable}>
            <div>마감</div>
            <div>~ 23.10.02 12:56</div>
          </div>
        </div>
      </div>
      {!moreBtn && (
        <div className={style.detailPlus} onClick={() => handlerMoreBtn()}>
          상세 보기
        </div>
      )}
      {moreBtn && (
        <>
          <div className={` ${style.discTextPlus} ${moreBtn ? style.open : ""}`}>
            <div className={style.divider}></div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>의뢰인</div>
              <div className={style.detailContent}>김동민</div>
            </div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>상황</div>
              <div className={style.detailContent}>사랑</div>
            </div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>대상</div>
              <div className={style.detailContent}>연인</div>
            </div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>색상</div>
              <div className={style.detailContent}>분홍, 파랑</div>
            </div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>선택한 꽃</div>
              <div className={style.detailContent}>
                <div>분홍 수국 - 소녀의 꿈, 처녀의 꿈</div>
                <div>분홍 수국 - 소녀의 꿈, 처녀의 꿈</div>
                <div>분홍 수국 - 소녀의 꿈, 처녀의 꿈</div>
              </div>
            </div>
            <div className={style.divider}></div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>주문유형</div>
              <div className={style.detailContent}>배달</div>
            </div>
            <div className={style.discDetailTable}>
              <div className={style.detailTitle}>주소</div>
              <div className={style.detailContent}>대전시 유성구</div>
            </div>
            <div className={style.discDetailTable} style={{ display: "inline-block" }}>
              <div className={style.detailTitle}>요청사항</div>
              <div className={`${style.detailContent} ${style.requestContent}`}>
                파랑 수국보다 분홍 수국이 더 많이 들어갔으면 좋겠어요! 20일날 고백하려고해요..
                이쁘게 부탁드려요!!
              </div>
            </div>
          </div>
          <div className={style.detailMius} onClick={() => handlerMoreBtn()}>
            접기
          </div>
        </>
      )}
    </div>
  );
};

export default Disc;
