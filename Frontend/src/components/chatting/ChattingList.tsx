import React, { useState } from "react";
import style from "./style/ChattingList.module.css";

import ChattingListCard from "./ChattingListCard";

type Chatting = {
  chattingId: number;
  lastChattingTime: string;
  lastChattingMessage: string;
  opponentMemberId: number;
  opponentName: string;
};

const ChattingList = () => {
  const [chattings, setChattings] = useState<Chatting[]>([
    {
      chattingId: 1,
      lastChattingTime: "2023-10-30",
      lastChattingMessage: "예쁘게 부탁드려요~",
      opponentMemberId: 1,
      opponentName: "아름다운 꽃가게",
    },
    {
      chattingId: 2,
      lastChattingTime: "2023-10-29",
      lastChattingMessage: "혹시 이렇게는 안될까요?",
      opponentMemberId: 2,
      opponentName: "우리동네 꽃가게",
    },
    {
      chattingId: 3,
      lastChattingTime: "2023-10-29",
      lastChattingMessage: "감사합니다!!",
      opponentMemberId: 3,
      opponentName: "수정꽃집",
    },
  ]);

  return (
    <>
      <div className={style.header}>
        <div className={style.headerTitle}>플리 채팅</div>
      </div>
      <div className={style.container}>
        {chattings.map((chatting, idx) => {
          return (
            <ChattingListCard
              key={idx + chatting.chattingId}
              chattingData={chatting}
            ></ChattingListCard>
          );
        })}
      </div>
    </>
  );
};

export default ChattingList;
