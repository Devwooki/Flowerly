import React, { useState } from "react";
import style from "./style/MypageReview.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import MypageReviewCard from "./MyFllyListComponent/MypageReviewCard/MypageReviewCard";

const MypageReview = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<string>("seller");

  return (
    <>
      <div className={style.fllyReviewBack}>
        <div className={style.fllyReviewHeader}>
          <div className={style.headerTitleBox}>
            <Image
              src="/img/btn/left-btn.png"
              alt="뒤로가기"
              width={13}
              height={20}
              onClick={() => {
                router.back();
              }}
            />
            <div className={style.headerTitle}>플리 리뷰</div>
          </div>
          {userType === "buyer" ? <div>내가 쓴 리뷰</div> : <div>우리 가게 리뷰</div>}
        </div>
        <div className={style.fllyReviewMain}>
          <MypageReviewCard />
          <MypageReviewCard />
          <MypageReviewCard />
          <MypageReviewCard />
          <MypageReviewCard />
          <MypageReviewCard />
          <MypageReviewCard />
          <MypageReviewCard />
        </div>
      </div>
    </>
  );
};

export default MypageReview;
