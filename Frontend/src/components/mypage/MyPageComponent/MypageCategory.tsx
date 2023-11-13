import React from "react";
import style from "./style/MypageCategory.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const MypageCategory = () => {
  const router = useRouter();

  // const navigateTo = (path: string) => {
  //   router.push(path);
  // };

  return (
    <>
      <div className={style.categoryContainer}>
        <div className={style.iconWithText}>
          <Image
            src="/img/icon/list.png"
            width={60}
            height={60}
            alt="list-icon"
            onClick={() => router.push("/mypage/mylist")}
          />
          <span className={style.iconText}>플리 내역</span>
        </div>

        <div className={style.iconWithText}>
          <Image
            src="/img/icon/review.png"
            width={60}
            height={60}
            alt="review-icon"
            onClick={() => router.push("/mypage/review")}
          />
          <span className={style.iconText}>리뷰 목록</span>
        </div>

        <div className={style.iconWithText}>
          <Image
            src="/img/icon/setting.png"
            width={60}
            height={60}
            alt="setting-icon"
            onClick={() => router.push("/mypage/setting")}
          />
          <span className={style.iconText}>설정</span>
        </div>
      </div>
    </>
  );
};

export default MypageCategory;
