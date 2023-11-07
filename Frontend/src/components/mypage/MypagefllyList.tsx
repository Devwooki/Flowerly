import React, { useState } from "react";
import style from "./style/MypagefllyList.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import SellerFllyList from "./MyFllyListComponent/SellerFllyList";
import BuyerFllyList from "./MyFllyListComponent/BuyerFllyList";

const MypagefllyList = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<string>("buyer");
  return (
    <>
      <div className={style.fllyListBack}>
        <div className={style.fllyListHeader}>
          <Image
            src="/img/btn/left-btn.png"
            alt="뒤로가기"
            width={13}
            height={20}
            onClick={() => {
              router.back();
            }}
          />
          <div className={style.headerTitle}>플리 내역</div>
        </div>
        <div className={style.fllyListMain}>
          {userType === "seller" && <SellerFllyList />}
          {userType === "buyer" && <BuyerFllyList />}
        </div>
      </div>
    </>
  );
};

export default MypagefllyList;
