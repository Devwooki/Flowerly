import React from "react";
import style from "./SellerFllyListCompletedCard.module.css";

const SellerFllyListCompletedCard = () => {
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
              <div>주문자</div>
              <div>김동민</div>
            </div>
            <div className={style.OrderInfoBoxHarf}>
              <div>주문유형</div>
              <div>배달</div>
            </div>
            <div className={style.OrderInfoBoxAll}>
              <div>배송완료 일시</div>
              <div>23.10.21. 18:00</div>
            </div>
          </div>
          <div className={style.OrderFooter}>
            <div>배달 완료</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerFllyListCompletedCard;
