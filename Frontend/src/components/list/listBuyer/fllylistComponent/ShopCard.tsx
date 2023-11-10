import React, { useState } from "react";
import style from "./ShopCard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import ShopModal from "./ShopModal";
import { motion } from "framer-motion";

type ShopCardProps = {
  shopInfo: ShopInfo;
};

const ShopCard = ({ shopInfo }: ShopCardProps) => {
  console.log("zz", shopInfo);

  const router = useRouter();
  const originalContent = shopInfo.recommandComment;
  const originalAdress = shopInfo.shopLoc;
  const maxLengthAD = 20; // 주소 최대 길이 설정
  const maxLengthCT = 30; // 코멘트 최대 길이 설정
  const [modal, setModal] = useState(false); // 모달창

  const truncatedAdress =
    originalAdress.length > maxLengthAD
      ? `${originalAdress.substring(0, maxLengthAD)}...`
      : originalAdress;
  const truncatedContent =
    originalContent.length > maxLengthCT
      ? `${originalContent.substring(0, maxLengthCT)}...`
      : originalContent;

  const moveToShop = (shopId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    router.push({ pathname: "/list/shop/[shopId]", query: { shopId: shopId } });
  };

  const modalState = () => {
    setModal((pre) => !pre);
  };

  return (
    <>
      <motion.div
        layoutId={`shopCardMain-${shopInfo.shopId}`}
        className={style.shopCardMain}
        onClick={() => setModal((pre) => !pre)}
      >
        <motion.div className={style.shopFlowerImg} layoutId={`shopFlowerImg-${shopInfo.shopId}`}>
          <Image src={shopInfo.reImg} alt="추천 꽃다발" fill />
        </motion.div>
        <motion.div className={style.shopInfo} layoutId={`shopInfo-${shopInfo.shopId}`}>
          <div className={style.infoTable}>
            <div onClick={(e) => moveToShop(1, e)} className={style.shopName}>
              {shopInfo.shopName}
            </div>
          </div>
          <div className={style.infoTable}>
            <Image src={"/img/icon/seller-location.png"} alt="가게 위치" width={10} height={15} />
            <div style={{ fontSize: "14px" }}>{truncatedAdress}</div>
          </div>
          <div className={style.infoTable}>
            <Image src={"/img/icon/seller-money.png"} alt="제시 금액 " width={15} height={15} />
            <div>{shopInfo.recommandPrice}</div>
          </div>
          <div className={style.responseContent}>{truncatedContent}</div>
        </motion.div>
        <div className={style.chatAction}>채팅하기</div>
      </motion.div>
      {modal && <ShopModal modal={modalState} shopInfo={shopInfo} shopId={shopInfo.shopId} />}
    </>
  );
};

export default ShopCard;
