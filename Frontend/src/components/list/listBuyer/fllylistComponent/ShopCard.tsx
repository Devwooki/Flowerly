import React from "react";
import style from "./ShopCard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const ShopCard = () => {
  const router = useRouter();
  const originalContent =
    "요청 사항 대로 예쁘게 만들어 드릴게요. 이렇게 하면 어떠신가요? 만들어줄께 만들어줄께 만들어줄께 만들어줄께";
  const maxLength = 30; // 최대 길이 설정

  const truncatedContent =
    originalContent.length > maxLength
      ? `${originalContent.substring(0, maxLength)}...`
      : originalContent;

  const moveToShop = (shopId: number) => {
    router.push({ pathname: "/list/shop/[shopId]", query: { shopId: shopId } });
  };

  return (
    <div className={style.shopCardMain}>
      <div className={style.shopFlowerImg}>
        <Image src={"/test/test-flower-img.png"} alt="추천 꽃다발" fill />
      </div>
      <div className={style.shopInfo}>
        <div className={style.infoTable}>
          <Image src={"/img/icon/seller-flower.png"} alt="추천 꽃다발" width={15} height={15} />
          <div onClick={() => moveToShop(1)}>꼬까게</div>
        </div>
        <div className={style.infoTable}>
          <Image src={"/img/icon/seller-location.png"} alt="추천 꽃다발" width={10} height={15} />
          <div>대전 유성구 학하서로 11</div>
        </div>
        <div className={style.infoTable}>
          <Image src={"/img/icon/seller-money.png"} alt="추천 꽃다발" width={15} height={15} />
          <div>25,000</div>
        </div>
        <div className={style.responseContent}>{truncatedContent}</div>
      </div>
      <div className={style.chatAction}>채팅하기</div>
    </div>
  );
};

export default ShopCard;
