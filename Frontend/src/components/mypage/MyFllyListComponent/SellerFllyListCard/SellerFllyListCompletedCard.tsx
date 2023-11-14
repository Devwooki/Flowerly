import React from "react";
import style from "./SellerFllyListCompletedCard.module.css";
import Router from "next/router";

interface Order {
  fllyId: number;
  orderName: string;
  orderType: string;
  deliveryPickupTime: string;
  progress: string;
}

interface SellerFllyListCompletedCardProps {
  data: Order;
}

const SellerFllyListCompletedCard: React.FC<SellerFllyListCompletedCardProps> = ({ data }) => {
  const handleMoveToOrder = () => {
    Router.push(`/flly/detail/${data.fllyId}`);
  };
  return (
    <>
      <div className={style.cardBack}>
        <div className={style.ImgBox} style={{ backgroundImage: `url(/test/horizental.jpg)` }} />
        <div className={style.InfoBox}>
          <div className={style.OrderAddBox}>
            <div onClick={handleMoveToOrder}>
              주문서 보기 <span> &gt;</span>
            </div>
          </div>
          <div className={style.OrderInfoBox}>
            <div className={style.OrderInfoBoxHarf}>
              <div>주문자</div>
              <div>{data.orderName}</div>
            </div>
            <div className={style.OrderInfoBoxHarf}>
              <div>주문유형</div>
              <div>{data.orderType}</div>
            </div>
            <div className={style.OrderInfoBoxAll}>
              <div>배송완료 일시</div>
              <div>{data.deliveryPickupTime}</div>
            </div>
          </div>
          <div className={style.OrderFooter}>
            <div>{data.progress}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerFllyListCompletedCard;
