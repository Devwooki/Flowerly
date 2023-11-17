import React, { useState } from "react";
import style from "./ChatStart.module.css";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { tokenHttp } from "@/api/tokenHttp";
import { useRecoilValue } from "recoil";
import { FllylistDiscRecoil } from "@/recoil/kdmRecoil";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

type CancelProps = {
  onCancel: () => void;
  shopInfo: storeContent;
};

const ChatStart = ({ onCancel, shopInfo }: CancelProps) => {
  const router = useRouter();
  const fllyRecoil = useRecoilValue(FllylistDiscRecoil);
  const { fllyId } = fllyRecoil;
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };
  const [title, setTitle] = useState<string>();
  const [sub, setSub] = useState<string>();

  const handleConfirm = () => {
    router.push({
      pathname: `/chatting/room/[id]`,
      query: {
        id: data?.chattingId,
      },
    });
    onCancel();
  };

  const { data, isError, isLoading } = useQuery<chatRoomBtn, AxiosError>(
    "ShopCardQuery",
    async () => {
      const res = await tokenHttp.post(`/chatting`, {
        sellerId: shopInfo.storeInfoDto.storeInfoId,
        fllyId: fllyId,
        fllyParticipationId: shopInfo.participant.fllyParticipationId,
      });
      return res.data.data;
    },
    {
      onError: (error) => {
        if (error?.response?.status === 403) {
          router.push("/fllylogin");
          ToastErrorMessage("로그인 만료되어 로그인 화면으로 이동합니다.");
        } else ToastErrorMessage("오류가 발생했습니다.");
      },
      onSuccess: (data) => {
        if (data?.isNew) {
          setTitle(`${shopInfo.storeInfoDto.storeName}와 채팅이 생성되었습니다. `);
          setSub("해당 채팅방으로 이동하시겠습니까?");
        } else {
          setTitle(`${shopInfo.storeInfoDto.storeName}와 채팅이 이미 존재합니다. `);
          setSub("해당 채팅방으로 이동하시겠습니까?");
        }
      },
      retry: false,
      cacheTime: 0,
    },
  );

  if (isError) {
    return <div>에러 발생!</div>;
  }

  if (isLoading) {
    return (
      <motion.div className={style.checkBack} exit="exit" variants={modalVariants}>
        <motion.div
          className={style.modalBack}
          layout
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <div>요청중...</div>
          <div>잠시만 기다려주세요.</div>
          <div className={style.modalBtnBox}>
            <div onClick={onCancel}>취소</div>
            <div onClick={handleConfirm}>확인</div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className={style.checkBack} exit="exit" variants={modalVariants}>
      <motion.div
        className={style.modalBack}
        layout
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <div>{title}</div>
        <div>{sub}</div>
        <div className={style.modalBtnBox}>
          <div onClick={onCancel}>취소</div>
          <div onClick={handleConfirm}>확인</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatStart;
