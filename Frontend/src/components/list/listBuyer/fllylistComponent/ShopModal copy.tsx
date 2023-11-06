import React, { useState } from "react";
import style from "./ShopModal.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type ShopModalProps = {
  shopInfo: ShopInfo;
};

const ShopModal = ({ shopInfo }: ShopModalProps) => {
  const router = useRouter();
  console.log("모달!");

  const moveToShop = (shopId: number) => {
    router.push({ pathname: "/list/shop/[shopId]", query: { shopId: shopId } });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <motion.div className={`${style.modalMain}`} exit="exit" variants={modalVariants}>
      <motion.div
        className={`${style.shopCardMain}`}
        layout
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
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
      </motion.div>
    </motion.div>
  );
};

export default ShopModal;
