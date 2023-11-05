import React from "react";
import style from "./ShippingInfoBox.module.css";

interface deliveryInfoType {
  recipientName: string;
  phoneNumber: string;
  address: string;
}

const ShippingInfoBox = ({ $deliveryInfo }: { $deliveryInfo: deliveryInfoType }) => {
  return (
    <>
      <div className={style.shippingInfoBack}>
        <div className={style.detailTitle}>배송 정보</div>
        <div className={style.detailInfoBox}>
          <div className={style.detailInfo}>
            <div>받는이</div>
            <div>{$deliveryInfo.recipientName}</div>
          </div>
          <div className={style.detailInfo}>
            <div>연락처</div>
            <div>{$deliveryInfo.phoneNumber}</div>
          </div>
          <div className={style.detailInfo}>
            <div>주소</div>
            <div>{$deliveryInfo.address}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingInfoBox;
