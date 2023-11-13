import React, { useState } from "react";
import style from "./MypageReviewCard.module.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { MemberInfo, memberInfoState } from "@/recoil/memberInfoRecoil";

interface BaseReviewType {
  reviewId: number;
  content: string;
  createdAt: string;
  type: "buyer" | "seller";
}

interface BuyerReviewType extends BaseReviewType {
  requestId: number;
  storeName: string;
  type: "buyer";
}

interface SellerReviewType extends BaseReviewType {
  consumerNickName: string;
  type: "seller";
}

type ReviewType = BuyerReviewType | SellerReviewType;

interface Props {
  ModalChangeHandler: () => void;
  SelectIdChangeHandler: (reviewId: number, index: number) => void;
  $requestIndex: number;
  $reviewInfo: ReviewType;
}

const MypageReviewCard = ({
  ModalChangeHandler,
  SelectIdChangeHandler,
  $requestIndex,
  $reviewInfo,
}: Props) => {
  const memberInfo = useRecoilValue<MemberInfo>(memberInfoState);

  const DeleteBtnHandler = () => {
    ModalChangeHandler();
    SelectIdChangeHandler($reviewInfo.reviewId, $requestIndex);
  };

  return (
    <>
      <div className={style.ReviewCardBack}>
        {$reviewInfo.type === "buyer" ? (
          <div className={style.BuyerReviewCardHeader}>
            <div>
              {$reviewInfo.storeName}
              <span>
                <Image src="/img/btn/right-btn.png" width={10} height={15} alt="이동"></Image>
              </span>
            </div>
            <div className={style.BuyerReviewDelete} onClick={DeleteBtnHandler}>
              삭제
            </div>
          </div>
        ) : (
          <div className={style.SellerReviewCardHeader}>
            <div>{$reviewInfo.consumerNickName}</div>
          </div>
        )}
        <div className={style.ReviewCardMain}>{$reviewInfo.content}</div>
        <div className={style.ReviewCardFooter}>
          <div>{$reviewInfo.createdAt}</div>
        </div>
      </div>
    </>
  );
};

export default MypageReviewCard;
