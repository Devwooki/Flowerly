import React from "react";
import style from "./SellerFllyListProgressCard.module.css";
import Image from "next/image";

const SellerFllyListProgressCard = () => {
  return (
    <>
      <div className={style.cardBack}>
        <div className={style.cardHeader}>
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
              <div>진행중인 플리 이동</div>
            </div>
          </div>
        </div>
        <div className={style.cardFooter}>
          <div className={style.cardMainState}>
            <Image
              src="/img/icon/flower-bouquet.png"
              width={16}
              height={16}
              alt="상태이미지"
            ></Image>
            <span>배달중</span>
          </div>
          <div className={style.cardFinshBtn}>완료하기</div>
        </div>
      </div>
    </>
  );
};

export default SellerFllyListProgressCard;
