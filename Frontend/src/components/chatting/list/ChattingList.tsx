import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import style from "./style/ChattingList.module.css";
import Image from "next/image";

import ChattingListCard from "./ChattingListCard";

import { useRecoilValue } from "recoil";
import { memberInfoState } from "@/recoil/memberInfoRecoil";
import { tokenHttp } from "@/api/chattingTokenHttp";

type Chatting = {
  chattingId: number;
  lastChattingTime: string;
  lastChattingMessage: string;
  unreadCnt: number;
  opponentMemberId: number;
  opponentName: string;
};

const ChattingList = () => {
  const [chattings, setChattings] = useState<Chatting[]>([]);
  const router = useRouter();
  const memberInfo = useRecoilValue(memberInfoState);

  const axiosHandler = () => {
    tokenHttp
      .get(`/chatting`)
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response.data.data);
          setChattings(response.data.data);
          //요거 필수!! (엑세스 토큰 만료로 재발급 받았다면 바꿔줘!! )
          if (response.headers.authorization) {
            localStorage.setItem("accessToken", response.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
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
