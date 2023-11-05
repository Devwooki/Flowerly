import React from "react";
import style from "./ShopModal.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { log } from "console";

type ShopModalProps = {
  shopInfo: ShopInfo;
};

const ShopModal = ({ shopInfo }: ShopModalProps) => {
  const router = useRouter();
  console.log("모달!");

  const moveToShop = (shopId: number) => {
    router.push({ pathname: "/list/shop/[shopId]", query: { shopId: shopId } });
  };

  return (
    <div className={style.modalMain}>
      <div className={style.shopCardMain}>
        <div className={style.shopFlowerImg}>
          <Image src={shopInfo.reImg} alt="추천 꽃다발" fill />
        </div>
        <div className={style.shopInfo}>
          <div className={style.infoTable}>
            <div onClick={() => moveToShop(1)} className={style.shopName}>
              {shopInfo.shopName}
            </div>
          </div>
          <div className={style.infoTable}>
            <Image src={"/img/icon/seller-location.png"} alt="가게 위치" width={10} height={15} />
            <div>{shopInfo.shopLoc}</div>
          </div>
          <div className={style.infoTable}>
            <Image src={"/img/icon/seller-money.png"} alt="제시 금액 " width={15} height={15} />
            <div>{shopInfo.recommandPrice}</div>
          </div>
          <div className={style.responseContent}>{shopInfo.recommandComment}</div>
        </div>
        <div className={style.chatAction}>채팅하기</div>
      </div>
    </div>
  );
};

export default ShopModal;
