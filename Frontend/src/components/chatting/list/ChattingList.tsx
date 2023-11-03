import React, { useState, useEffect } from "react";
import style from "./ChattingList.module.css";

import axios from "axios";

import ChattingListCard from "./ChattingListCard";

type Chatting = {
  chattingId: number;
  lastChattingTime: string;
  lastChattingMessage: string;
  opponentMemberId: number;
  opponentName: string;
};

const ChattingList = () => {
  const [chattings, setChattings] = useState<Chatting[]>([]);

  const axiosHandler = () => {
    axios.get(`https://flower-ly.co.kr/api/chatting`).then((response) => {
      // console.log(response.data.data);
      setChattings(response.data.data);
    });
  };

  useEffect(() => {
    axiosHandler();
  }, [chattings]);

  return (
    <>
      <div className={style.header}>
        <div className={style.headerTitle}>플리 채팅</div>
      </div>
      <div className={style.container}>
        {chattings.map((chatting, idx) => {
          return <ChattingListCard key={chatting.chattingId} chattingData={chatting} />;
        })}
      </div>
    </>
  );
};

export default ChattingList;
