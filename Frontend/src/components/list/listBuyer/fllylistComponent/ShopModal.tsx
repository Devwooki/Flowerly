import React, { useState } from "react";
import style from "./ShopModal.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type ShopModalProps = {
  shopInfo: storeContent;
  modal: () => void;
  chatModal: () => void;
};

const ShopModal = ({ shopInfo, modal, chatModal }: ShopModalProps) => {
  const router = useRouter();
  const moveToShop = (shopId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    router.push({ pathname: "/list/shop/[shopId]", query: { shopId: shopId } });
  };

  return (
    <>
      <motion.div
        className={`${style.modalMain}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
        onClick={modal}
      >
        <motion.div
          layoutId={`shopCardMain-${shopInfo.participant.fllyParticipationId}`}
          className={`${style.shopCardMain}`}
        >
          <motion.div
            className={style.shopFlowerImg}
            layoutId={`shopFlowerImg-${shopInfo.participant.fllyParticipationId}`}
          >
            <Image src={shopInfo.participant.imageUrl} alt="추천 꽃다발" fill />
          </motion.div>
          <motion.div
            className={style.shopInfo}
            layoutId={`shopInfo-${shopInfo.participant.fllyParticipationId}`}
          >
            <div
              className={style.shopName}
              onClick={(e) => moveToShop(shopInfo.storeInfoDto.storeInfoId, e)}
            >
              {shopInfo.storeInfoDto.storeName}&nbsp;&nbsp;<Image src={"/img/icon/move.png"} alt="move" width={28} height={28}/>
            </div>
            <div className={style.infoTable}>
              <Image src={"/img/icon/seller-location.png"} alt="가게 위치" width={10} height={15} />
              <div>{shopInfo.storeInfoDto.address}</div>
            </div>
            <div className={style.infoTable}>
              <Image src={"/img/icon/seller-money.png"} alt="제시 금액 " width={15} height={15} />
              <div>{Number(shopInfo.participant.offerPrice).toLocaleString()}</div>
            </div>
            <div className={style.responseContent}>{shopInfo.participant.content}</div>
          </motion.div>
          <div className={style.chatAction} onClick={chatModal}>
            채팅하기
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ShopModal;
