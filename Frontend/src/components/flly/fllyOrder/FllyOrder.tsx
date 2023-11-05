import React from "react";
import style from "./style/FllyOrder.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import FllyInfoBox from "./fllyOrderComponent/FllyInfoBox";
import OrderInfoBox from "./fllyOrderComponent/OrderInfoBox";
import ShippingInfoBox from "./fllyOrderComponent/ShippingInfoBox";
import PaymentInfoBox from "./fllyOrderComponent/PaymentInfoBox";

const FllyOrder = () => {
  const router = useRouter();

  return (
    <>
      <div className={style.orderBox}>
        <div className={style.orderHeader}>
          <Image
            src="/img/btn/left-btn.png"
            alt="뒤로가기"
            width={13}
            height={20}
            onClick={() => {
              router.back();
            }}
          />

          <div className={style.headerTitle}>플리 주문서</div>
        </div>
        <div className={style.infoBox}>
          <div className={style.fllyInfoBox}>
            <FllyInfoBox />
          </div>
          <div className={style.oderInfoBox}>
            <OrderInfoBox />
          </div>
          <div className={style.shippingInfoBox}>
            <ShippingInfoBox />
          </div>
          <div className={style.paymentInfoBox}>
            <PaymentInfoBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyOrder;
