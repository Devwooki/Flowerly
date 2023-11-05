import React from "react";
import style from "./OrderInfoBox.module.css";

interface orderInfoType {
  requestId: number;
  orderName: string;
  phoneNumber: string;
  orderType: string;
  deliveryPickupTime: string;
  fllyId: number;
  progress: string;
  responseImgUrl: string | null;
  responseContent: string;
  price: number;
  createTime: string;
}

const OrderInfoBox = ({ $orderInfo }: { $orderInfo: orderInfoType }) => {
  return (
    <>
      <div className={style.orderInfoBack}>
        <div className={style.detailTitle}>주문정보</div>
        <div className={style.detailInfoBox}>
          <div>아름다움 꽃가게</div>
          <div className={style.detailInfo}>
            <div>주문자</div>
            <div>{$orderInfo.orderName}</div>
          </div>
          <div className={style.detailInfo}>
            <div>연락처</div>
            <div>{$orderInfo.phoneNumber}</div>
          </div>
          <div className={style.detailInfo}>
            <div>주문일시</div>
            <div>{$orderInfo.createTime}</div>
          </div>
          <div className={style.bar} />
          <div className={style.detailInfo}>
            <div>주문유형</div>
            <div>{$orderInfo.orderType}</div>
          </div>
          <div className={style.detailInfo}>
            <div>배달일시</div>
            <div>{$orderInfo.deliveryPickupTime}</div>
          </div>
          <div className={style.requestInfo}>
            <div>요청사항</div>
            <div>{$orderInfo.responseContent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfoBox;
