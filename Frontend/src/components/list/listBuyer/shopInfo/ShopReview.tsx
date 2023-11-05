import React from "react";
import style from "./ShopReview.module.css";

const ShopReview = () => {
  type review = {
    userName: string;
    reviewTime: string;
    reviewContent: string;
  };
  const reviewList = [
    { userName: "닉네임이요", reviewTime: "2022.9.02", reviewContent: "꽃다발 너무예뻐요" },
    { userName: "김동민", reviewTime: "2022.12.18", reviewContent: "잘 받았습니다" },
    { userName: "이현욱", reviewTime: "2023.01.04", reviewContent: "사진이랑 똑같네요" },
    { userName: "정수정", reviewTime: "2023.01.22", reviewContent: "꽃이 다 떨어졌어요 ㅡㅡ" },
    { userName: "정현모", reviewTime: "2023.03.18", reviewContent: "문앞에 두고 가주세요" },
    { userName: "권기연", reviewTime: "2023.05.16", reviewContent: "다음에 또 이용할께요~~^^" },
    { userName: "김하영", reviewTime: "2023.07.23", reviewContent: "남자친구가 너무 좋아해요" },
    { userName: "이병헌", reviewTime: "2023.10.29", reviewContent: "이병헌 왔다감" },
  ];
  return (
    <div className={style.reviewMain}>
      <div className={style.reviewTitle}>사용자 리뷰</div>
      {reviewList.map((review, idx) => (
        <div className={style.review} key={review.reviewTime + idx}>
          <div className={style.reviewUser}>
            <div className={style.userName}>{review.userName}</div>
            <div className={style.reviewTime}>{review.reviewTime}</div>
          </div>
          <div className={style.reviewContent}>{review.reviewContent}</div>
        </div>
      ))}
    </div>
  );
};

export default ShopReview;
