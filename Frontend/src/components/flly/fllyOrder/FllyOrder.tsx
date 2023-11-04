import React from "react";
import style from "./style/FllyOrder.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

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
          <div className={style.fllyInfoBox}></div>
          <div className={style.oderInfoBox}></div>
          <div className={style.shippingInfoBox}></div>
          <div className={style.paymentInfoBox}></div>
        </div>
      </div>
    </>
  );
};

export default FllyOrder;
