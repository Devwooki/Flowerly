import React, { useState, useEffect, useRef } from "react";
import style from "./style/ChattingList.module.css";
import axios from "axios";
import Image from "next/image";

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
      // console.log(response.data);
      setChattings(response.data.data);
    });
  };

  const [isActive, setIsActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>();

  useEffect(() => {
    axiosHandler();
  }, []);

  return (
    <>
      <div className={style.header}>
        <div className={style.headerTitle}>플리 채팅</div>
        <div
          className={style.right}
          style={{
            width: isActive ? "45%" : "40px",
          }}
        >
          {isActive && (
            <input
              type="text"
              value={searchKeyword}
              autoFocus
              placeholder="이름 검색"
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
              onBlur={(e) => {
                if (e.target.value.trim() === "") {
                  setIsActive(false);
                  setSearchKeyword(e.target.value.trim());
                }
              }}
            />
          )}
          <div className={style.icon}>
            <Image
              src="/img/btn/search-btn.png"
              width={20}
              height={20}
              alt="상태이미지"
              onClick={() => {
                if (!isActive) {
                  setIsActive(true);
                } else {
                  // 검색 버튼 역할
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className={style.container}>
        {chattings
          .filter((chatting) => {
            if (searchKeyword?.trim())
              return chatting.opponentName
                .toLowerCase()
                .includes(searchKeyword?.trim().toLowerCase());
            else return chatting;
          })
          .map((chatting, idx) => {
            return <ChattingListCard key={chatting.chattingId} chattingData={chatting} />;
          })}
      </div>
    </>
  );
};

export default ChattingList;
