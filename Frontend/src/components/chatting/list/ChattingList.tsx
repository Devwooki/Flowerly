import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import style from "./style/ChattingList.module.css";
import axios from "axios";
import Image from "next/image";

import ChattingListCard from "./ChattingListCard";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

import { useRecoilValue } from "recoil";
import { memberInfoState } from "@/recoil/memberInfoRecoil";

type Chatting = {
  chattingId: number;
  lastChattingTime: string;
  lastChattingMessage: string;
  opponentMemberId: number;
  opponentName: string;
};

const ChattingList = () => {
  const [chattings, setChattings] = useState<Chatting[]>([]);
  const router = useRouter();
  const memberInfo = useRecoilValue(memberInfoState);

  const axiosHandler = () => {
    const BaseUrl = `https://flower-ly.co.kr/api/chatting`;
    // const accessToken = localStorage.getItem("accessToken");
    const accessToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODY4MzQ4NiwibWVtYmVySWQiOjF9.wU3IYYWErRie5E5s7oIRYMliboyumfMrCZILaKnwlxXxJXCW1kHZ5fJ-mKvsAwYuMV4-UT0F4qoUX9rVcrTiNw";
    // const accessToken =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODc1MjUwMywibWVtYmVySWQiOjJ9.o_v_EVuucqlh2NPfHioqquPjm3U-JTP-7ZP2xJkxIxMsPBMhxnw0DL-Avnh2ryBa_J6JYS7YdCc5dZuMS_9IUw";
    axios
      .get(BaseUrl, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === 200) {
          setChattings(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.log("잠이나 자자");
        }
        ToastErrorMessage("서버 에러 발생!! 초비상!!!");
      });
    // axios.get(`https://flower-ly.co.kr/api/chatting`).then((response) => {
    //   // console.log(response.data);
    //   setChattings(response.data.data);
    // });
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
