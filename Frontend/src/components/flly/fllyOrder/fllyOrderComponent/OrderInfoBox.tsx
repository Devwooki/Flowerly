import React from "react";
import style from "./OrderInfoBox.module.css";

const OrderInfoBox = () => {
  return (
    <>
      <div className={style.orderInfoBack}>
        <div className={style.detailTitle}>주문정보</div>
        <div className={style.detailInfoBox}>
          <div>아름다움 꽃가게</div>
          <div className={style.detailInfo}>
            <div>주문자</div>
            <div>김동민</div>
          </div>
          <div className={style.detailInfo}>
            <div>연락처</div>
            <div>101</div>
          </div>
          <div className={style.detailInfo}>
            <div>주문일시</div>
            <div>2023년 10월 19일 20: 13</div>
          </div>
          <div className={style.bar} />
          <div className={style.detailInfo}>
            <div>주문유형</div>
            <div>배달</div>
          </div>
          <div className={style.detailInfo}>
            <div>배달일시</div>
            <div>배달</div>
          </div>
          <div className={style.requestInfo}>
            <div>요청사항</div>
            <div>
              배달dasfkjㅁㄴ이ㅏ런마ㅣㅇ러만어리ㅏ먼ㅇㄹ;ㅣㅏㅓㅁㄴㅇ리ㅏ;ㅓㅁㄴ아ㅣ럼ㄴ아ㅣ럼ㄴ이ㅏ럼니;런ㅁ이ㅏ러민아럼ㄴ아ㅣ럼나ㅣㅇ;러미낭럼니아;ㅓ라ㅣ
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfoBox;
