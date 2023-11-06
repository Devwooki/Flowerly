import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ShopModal from "./ShopModal";
import { AnimatePresence } from "framer-motion";

type ShopCardProps = {
  shopInfo: ShopInfo;
};

const ShopCard = ({ shopInfo }: ShopCardProps) => {
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

  return (
    <div className="shopCardMain" onClick={() => setModal((pre) => !pre)}>
      <div className="shopFlowerImg">
        <Image src={shopInfo.reImg} alt="추천 꽃다발" fill />
      </div>
      <div className="shopInfo">
        <div className="infoTable">
          <div onClick={(e) => moveToShop(1, e)} className="shopName">
            {shopInfo.shopName}
          </div>
        </div>
        <div className="infoTable">
          <Image src={"/img/icon/seller-location.png"} alt="가게 위치" width={10} height={15} />
          <div style={{ fontSize: "14px" }}>{truncatedAdress}</div>
        </div>
        <div className="infoTable">
          <Image src={"/img/icon/seller-money.png"} alt="제시 금액 " width={15} height={15} />
          <div>{shopInfo.recommandPrice}</div>
        </div>
        <div className="responseContent">{truncatedContent}</div>
      </div>
      <div className="chatAction">채팅하기</div>
      <AnimatePresence>{modal && <ShopModal shopInfo={shopInfo} />}</AnimatePresence>
    </div>
  );
};

export default ShopCard;
