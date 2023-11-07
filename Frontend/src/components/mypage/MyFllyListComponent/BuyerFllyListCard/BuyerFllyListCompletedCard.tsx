import React, { useState } from "react";
import style from "./BuyerFllyListCompletedCard.module.css";

const BuyerFllyListCompletedCard = ({ ModalChangeHandler }: { ModalChangeHandler: () => void }) => {
  const [riviewState, setRiviewState] = useState<Boolean>(false);
  return (
    <>
      <div className={style.cardBack}>
        <div className={style.ImgBox} style={{ backgroundImage: `url(/test/horizental.jpg)` }} />
        <div className={style.InfoBox}>
          <div className={style.OrderAddBox}>
            <div>
              주문서 보기 <span> &gt;</span>
            </div>
          </div>
          <div className={style.OrderInfoBox}>
            <div className={style.OrderInfoBoxHarf}>
              <div>구매처</div>
              <div>행복한 꽃집</div>
            </div>
            <div className={style.OrderInfoBoxHarf}>
              <div>주문유형</div>
              <div>배달</div>
            </div>
            <div className={style.OrderInfoBoxAll}>
              <div>배송일시</div>
              <div>23.10.21. 18:00</div>
            </div>
          </div>
          {riviewState ? (
            <div className={style.OrderFooterTrue}>
              <div>리뷰 작성 완료</div>
            </div>
          ) : (
            <div className={style.OrderFooterFalse} onClick={ModalChangeHandler}>
              <div>리뷰 작성</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BuyerFllyListCompletedCard;
