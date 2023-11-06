import React from "react";
import style from "./ShopModal.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type ShopModalProps = {
  shopInfo: ShopInfo;
  shopId: number;
  modal: () => void;
};

const ShopModal = ({ shopInfo, shopId, modal }: ShopModalProps) => {
  const router = useRouter();

  const moveToShop = (shopId: number) => {
    router.push({ pathname: "/list/shop/[shopId]", query: { shopId: shopId } });
  };

  return (
    <motion.div
      className={`${style.modalMain}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      onClick={modal}
    >
      <motion.div layoutId={`shopCardMain-${shopId}`} className={`${style.shopCardMain}`}>
        <motion.div className={style.shopFlowerImg} layoutId={`shopFlowerImg-${shopId}`}>
          <Image src={shopInfo.reImg} alt="추천 꽃다발" fill />
        </motion.div>
        <motion.div className={style.shopInfo} layoutId={`shopInfo-${shopId}`}>
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
        </motion.div>
        <div className={style.chatAction}>채팅하기</div>
      </motion.div>
    </motion.div>
  );
};

export default ShopModal;
