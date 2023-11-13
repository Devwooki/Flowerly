import React, { useState } from "react";
import style from "./ShopCard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import ShopModal from "./ShopModal";
import { motion } from "framer-motion";
import { tokenHttp } from "@/api/tokenHttp";
import { useRecoilValue } from "recoil";
import { FllylistDiscRecoil } from "@/recoil/kdmRecoil";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import ChatStart from "./ChatStart";

type ShopCardProps = {
  shopInfo: storeContent;
};

const ShopCard = ({ shopInfo }: ShopCardProps) => {
  const router = useRouter();
  const originalContent = shopInfo.participant.content;
  const originalAdress = shopInfo.storeInfoDto.address;
  const maxLengthAD = 20; // 주소 최대 길이 설정
  const maxLengthCT = 30; // 코멘트 최대 길이 설정
  const [modal, setModal] = useState(false); // 모달창
  const [modalChat, setModalChat] = useState(false);
  const fllyRecoil = useRecoilValue(FllylistDiscRecoil);
  const { fllyId } = fllyRecoil;
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

  const { data, isError, refetch } = useQuery<chatRoomBtn, AxiosError>(
    "ShopCardQuery",
    async () => {
      const res = await tokenHttp.post(`/chatting`, {
        sellerId: shopInfo.storeInfoDto.storeInfoId,
        fllyId: fllyId,
        fllyParticipationId: shopInfo.participant.fllyParticipationId,
      });
      console.log("생성", res.data.data);
      console.log("생성 방 ID", res.data.data.chattingId);

      return res.data.data;
    },
    {
      onError: (error) => {
        console.log("에러 발생했다 임마");
        console.log(error?.response?.status);
      },
      retry: false,
      cacheTime: 0,
      enabled: false,
    },
  );

  const createChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("생성", data?.chattingId);
    // refetch();
    setModalChat(true);
    // router.push({
    //   pathname: `/chatting/room/[id]`,
    //   query: {
    //     id: data?.chattingId,
    //   },
    // });
  };

  const handleModalChat = () => {
    setModalChat((pre) => !pre);
  };

  return (
    <>
      <motion.div
        layoutId={`shopCardMain-${shopInfo.participant.fllyParticipationId}`}
        className={style.shopCardMain}
        onClick={() => setModal((pre) => !pre)}
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
          <div className={style.infoTable}>
            <div
              onClick={(e) => moveToShop(shopInfo.storeInfoDto.storeInfoId, e)}
              className={style.shopName}
            >
              {shopInfo.storeInfoDto.storeName}
            </div>
          </div>
          <div className={style.infoTable}>
            <Image src={"/img/icon/seller-location.png"} alt="가게 위치" width={10} height={15} />
            <div style={{ fontSize: "14px" }}>{truncatedAdress}</div>
          </div>
          <div className={style.infoTable}>
            <Image src={"/img/icon/seller-money.png"} alt="제시 금액 " width={15} height={15} />
            <div>{shopInfo.participant.offerPrice}</div>
          </div>
          <div className={style.responseContent}>{truncatedContent}</div>
        </motion.div>
        <div className={style.chatAction} onClick={(e) => createChat(e)}>
          채팅하기
        </div>
      </motion.div>
      {modal && <ShopModal modal={modalState} shopInfo={shopInfo} />}
      {modalChat && <ChatStart onCancel={handleModalChat} />}
    </>
  );
};

export default ShopCard;
