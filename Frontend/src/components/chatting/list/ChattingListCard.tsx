import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import style from "./style/ChattingListCard.module.css";
import Image from "next/image";

type ChattingProps = {
  chattingData: {
    chattingId: number;
    lastChattingTime: string;
    lastChattingMessage: string;
    unreadCnt: number;
    chattingStatus: string;
    opponentMemberId: number;
    opponentName: string;
    imageUrl: string;
  };
  modalHandler: Function;
};

const ChattingListCard: React.FC<ChattingProps> = ({ chattingData, modalHandler }) => {
  const router = useRouter();

  const [touchX, setTouchX] = useState(0);
  const upperDivRef = useRef<HTMLDivElement>(null);

  const disableUpperDiv = () => {
    upperDivRef.current!.style.pointerEvents = "none";
  };

  const enableUpperDiv = () => {
    upperDivRef.current!.style.pointerEvents = "auto";
  };

  const touchStartHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchX(e.changedTouches[0].pageX);
  };

  const touchEndHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const distanceX = touchX - e.changedTouches[0].pageX;

    if (upperDivRef.current) {
      if (distanceX > 25) {
        // 25px 이상 움직였을 경우
        upperDivRef.current.style.setProperty("left", "-50px");
        disableUpperDiv();
      } else {
        upperDivRef.current.style.setProperty("left", "0px");
        enableUpperDiv();
      }
    }
  };

  const touchMoveHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const distanceX = touchX - e.changedTouches[0].pageX;

    if (upperDivRef.current) {
      const offset = Math.max(-50, Math.min(0, -distanceX)); // 최소 -50px, 최대 0px 사이로 제한
      upperDivRef.current.style.setProperty("left", `${offset}px`);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (upperDivRef.current && !upperDivRef.current.contains(event.target as Node)) {
        // 클릭된 요소가 upperDiv 외부에 있는 경우
        upperDivRef.current.style.setProperty("left", "0px");
        enableUpperDiv();
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleDocumentClick);

    // 컴포넌트 언마운트 시 클릭 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.div className={style.wrapper} layoutId={`wrapper-${chattingData.chattingId}`}>
          <div className={style.cardMain} id={style.underDiv}>
            <div className={style.contentDiv}></div>
            <div
              className={style.exitDiv}
              onClick={() => {
                console.log(`${chattingData.chattingId}번 채팅방 나가기`);
                modalHandler(chattingData.chattingId, true);
              }}
            >
              <Image
                className={style.icon}
                src="/img/icon/chatting-exit.png"
                width={22}
                height={22}
                alt="상태이미지"
              />
            </div>
          </div>
          <div
            className={style.cardMain}
            id={style.upperDiv}
            onTouchStart={touchStartHandler}
            onTouchMove={touchMoveHandler}
            onTouchEnd={touchEndHandler}
            ref={upperDivRef}
          >
            <div className={style.contentImg}>
              <Image
                width={70}
                height={70}
                src={chattingData.imageUrl}
                alt="의뢰 이미지"
                onClick={() => router.push(`/chatting/room/${chattingData.chattingId}`)}
                onError={(e) => {
                  e.currentTarget.src = "/img/etc/no-image.jpg";
                }}
              ></Image>
            </div>
            <div
              className={style.contentDivMain}
              onClick={() => router.push(`/chatting/room/${chattingData.chattingId}`)}
            >
              <div className={style.cardTop}>
                <div className={style.opponentName}>{chattingData.opponentName}</div>
                <div className={style.time}>{chattingData.lastChattingTime}</div>
              </div>
              <div className={style.cardBottom}>
                <div>{chattingData.lastChattingMessage}</div>
                {chattingData.unreadCnt > 0 && (
                  <div className={style.newMsg}>{chattingData.unreadCnt}</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ChattingListCard;
