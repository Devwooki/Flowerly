import React, { useState } from "react";
import style from "./BuyerFllyListCompletedCard.module.css";
import Router from "next/router";

interface BuyerFillListType {
  fllyId: number;
  buyerNickName: string;
  deliveryPickupTime: string;
  progress: string;
  storeName: string;
  fllyOrderType: string;
  requestOrderType: string;
  isReviewed: boolean;
  imageUrls: string;
  createdAt: string;
  requestId: number | null;
}

interface Props {
  ModalChangeHandler: () => void;
  $fllyInfo: BuyerFillListType;
  SelectIdChangeHandler: (fllyId: number, index: number) => void;
  $index: number;
}

const BuyerFllyListCompletedCard = ({
  ModalChangeHandler,
  $fllyInfo,
  SelectIdChangeHandler,
  $index,
}: Props) => {
  const ReviewBtnHandler = () => {
    if ($fllyInfo.requestId) {
      SelectIdChangeHandler($fllyInfo.requestId, $index);
      ModalChangeHandler();
    }
  };

  const handleFllyDetail = () => {
    Router.push(`/flly/order/sheet/${$fllyInfo.fllyId}`);
  };

  const handleFllyReview = () => {
    Router.push("/mypage/review");
  };

  return (
    <>
      <div className={style.cardBack}>
        <div
          className={style.ImgBox}
          style={{ backgroundImage: `url('${$fllyInfo.imageUrls}')` }}
        />
        <div className={style.InfoBox}>
          <div className={style.OrderAddBox} onClick={() => handleFllyDetail()}>
            <div>
              주문서 보기 <span> &gt;</span>
            </div>
          </div>
          <div className={style.OrderInfoBox}>
            <div className={style.OrderInfoBoxHarf}>
              <div>구매처</div>
              <div>{$fllyInfo.storeName}</div>
            </div>
            <div className={style.OrderInfoBoxHarf}>
              <div>주문유형</div>
              <div>{$fllyInfo.requestOrderType}</div>
            </div>
            <div className={style.OrderInfoBoxAll}>
              {$fllyInfo.requestOrderType === "배달" ? <div>배달 일시</div> : <div>픽업 일시</div>}
              <div>{$fllyInfo.deliveryPickupTime}</div>
            </div>
          </div>
          {$fllyInfo.isReviewed ? (
            <div className={style.OrderFooterTrue} onClick={() => handleFllyReview()}>
              <div>리뷰 작성 완료</div>
            </div>
          ) : (
            <div className={style.OrderFooterFalse} onClick={() => ReviewBtnHandler()}>
              <div>리뷰 작성</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BuyerFllyListCompletedCard;
