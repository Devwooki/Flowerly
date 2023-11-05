import React from "react";
import style from "./ShippingInfoBox.module.css";

const ShippingInfoBox = () => {
  return (
    <>
      <div className={style.shippingInfoBack}>
        <div className={style.detailTitle}>배송 정보</div>
        <div className={style.detailInfoBox}>
          <div className={style.detailInfo}>
            <div>받는이</div>
            <div>김동민</div>
          </div>
          <div className={style.detailInfo}>
            <div>연락처</div>
            <div>101</div>
          </div>
          <div className={style.detailInfo}>
            <div>주소</div>
            <div>2023년 10월 19일 20: 13ㅓㅏㅘㅓㅘㅗㅇㅁ나라ㅣㄴ어리ㅏㄴ어</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingInfoBox;
