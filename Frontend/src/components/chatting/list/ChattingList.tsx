import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import style from "./style/ChattingList.module.css";
import Image from "next/image";

import ChattingListCard from "./ChattingListCard";
import ChattingListExitModal from "./ChattingListExitModal";

import { useRecoilValue } from "recoil";
import { memberInfoState } from "@/recoil/memberInfoRecoil";
import { tokenHttp } from "@/api/tokenHttp";

import SockJS from "sockjs-client";
import { Client, CompatClient, Stomp } from "@stomp/stompjs";

type Chatting = {
  chattingId: number;
  lastChattingTime: string;
  lastChattingMessage: string;
  unreadCnt: number;
  chattingStatus: string;
  opponentMemberId: number;
  opponentName: string;
  imageUrl: string;
};

const ChattingList = () => {
  const [chattings, setChattings] = useState<Chatting[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalChattingId, setModalChattingId] = useState<number>();
  const memberInfo = useRecoilValue(memberInfoState);

  const router = useRouter();
  const stompClient = useRef<CompatClient | null>(null);

  const axiosHandler = () => {
    tokenHttp
      .get(`/chatting`)
      .then((response) => {
        if (response.data.code === 200) {
          // console.log(response.data.data);
          setChattings(response.data.data);
          //요거 필수!! (엑세스 토큰 만료로 재발급 받았다면 바꿔줘!! )
          if (response.headers.authorization) {
            localStorage.setItem("accessToken", response.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response.satus && err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
  };

  const [isActive, setIsActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>();

  useEffect(() => {
    axiosHandler();
    // SockJS와 STOMP 설정
    // const socket = new SockJS(`http://localhost:6090/stomp-chat`); // 로컬 테스트용
    const socket = new SockJS("https://flower-ly.co.kr/stomp-chat"); // 배포용

    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      // 특정 채팅방의 메세지를 구독
      stompClient.current?.subscribe(`/sub/list/${memberInfo.id}`, (chattingData) => {
        // stompClient.current?.subscribe(`/sub/list/2`, (chattingData) => {
        // stompClient.current?.subscribe(`/sub/list/1`, (chattingData) => {
        // console.log(chattingData);
        const newChattingData = JSON.parse(chattingData.body);

        setChattings((currentChattings) => {
          // 기존 채팅 목록에서 newChattingData와 chattingId가 동일한 요소를 찾습니다.
          const existingChattingIndex = currentChattings.findIndex(
            (chatting) => chatting.chattingId === newChattingData.chattingId,
          );

          // 새로운 채팅 데이터를 기존 데이터와 결합합니다.
          let updatedChatting = newChattingData;
          if (existingChattingIndex !== -1) {
            updatedChatting = { ...currentChattings[existingChattingIndex], ...newChattingData };
          }

          const filteredChattings = currentChattings.filter(
            (chatting) => chatting.chattingId !== newChattingData.chattingId,
          );
          return [updatedChatting, ...filteredChattings];
        });
      });
    });

    // 컴포넌트 unmount 시 연결 종료
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => {
          // console.log("Disconnected");
        }, {});
      }
    };
  }, []);

  const modalHandler = (chattingId: number, state: boolean) => {
    setModalState(state);
    setModalChattingId(chattingId);
  };

  return (
    <>
      <div className={style.back}>
        {modalState && modalChattingId && (
          <ChattingListExitModal
            chattingId={modalChattingId}
            modalHandler={modalHandler}
            axiosHandler={axiosHandler}
          />
        )}
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
              return (
                <ChattingListCard
                  key={chatting.chattingId}
                  chattingData={chatting}
                  modalHandler={modalHandler}
                />
              );
            })}
          {chattings.length == 0 && (
            <div className={style.noDataDiv}>
              <Image
                className={style.noDataImg}
                src="/img/etc/no-chatting-image.png"
                width={200}
                height={200}
                alt="채팅 없음 이미지"
              />
              <div>채팅이 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChattingList;
