import React, { useState, useEffect } from "react";
import style from "./style/ChattingRoom.module.css";
import { useRouter } from "next/router";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import ChattingInput from "./ChattingInput";
import MyChattingMsg from "./MyChattingMsg";
import YourChattingMsg from "./YourChattingMsg";

type ChattingRoomProps = {
  chattingId: number;
};

const ChattingRoom: React.FC<ChattingRoomProps> = ({ chattingId }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  useEffect(() => {
    // SockJS와 STOMP 설정
    // const socket = new SockJS("http://localhost:6090/stomp-chat");
    const socket = new SockJS("https://flower-ly.co.kr/stomp-chat");
    const client = new Client({
      webSocketFactory: () => socket,
    });

    client.onConnect = (frame) => {
      console.log("Connected: ", frame);

      // 특정 채팅방의 메세지를 구독
      client.subscribe(`/sub/message/${chattingId}`, (message) => {
        console.log(message.body);
      });
    };

    client.onStompError = (error) => {
      console.error("STOMP Error:", error);
    };

    client.onDisconnect = () => {
      console.log("Disconnected");
    };

    // 연결 시작
    client.activate();
    setStompClient(client);

    // 컴포넌트 unmount 시 연결 종료
    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, []);

  const route = useRouter();
  // axios로 받아야 함!!
  const [chattingMsgs, setChattingMsgs] = useState({
    chattingId: chattingId,
    opponentMemberId: 1,
    opponentName: "아름다운 꽃가게",
    messages: [
      {
        memberId: 999,
        createdAt: "2023-10-31 12:00",
        content: "",
        type: "PARTICIPATION",
      },
      {
        memberId: 999,
        createdAt: "2023-10-31 12:00",
        content: "안녕하세요",
        type: "TEXT",
      },
      {
        memberId: 999,
        createdAt: "2023-10-31 12:00",
        content:
          "올려주신 꽃으로 구매하고 싶습니다. 가나다라마마라어날ㅇ니허아런아허아ㅣㄴ러나ㅣ으라파ㅓㄹ아느라ㅣ어나픙나ㅣ러ㅏㅇ느팡니ㅓ라ㅣ느파이너라",
        type: "TEXT",
      },
      {
        memberId: 1,
        createdAt: "2023-10-31 12:00",
        content: "안녕하세요",
        type: "TEXT",
      },
      {
        memberId: 1,
        createdAt: "2023-10-31 12:00",
        content: "주문 양식 보내드릴게요!",
        type: "TEXT",
      },
    ],
  });

  const moveBack = () => {
    route.back();
  };

  const sendMessage = () => {
    const destination = `/pub/message/${chattingId}`;
    const stompChatRequest = {
      chattingId,
      memberId: 1,
      type: "TEXT",
      content: "채팅 테스트",
    };
    const body = JSON.stringify(stompChatRequest);

    if (stompClient && stompClient.connected) {
      stompClient.publish({ destination, body });
      console.log("메세지 보내기 성공");
    }
  };

  return (
    <>
      <div className={style.rooomBg}>
        <div className={style.header}>
          <div className={style.backBtn} onClick={() => moveBack()}>
            &lt;
          </div>
          <div className={style.chattingName}>{chattingMsgs.opponentName}</div>
        </div>
        <div className={style.container}>
          {chattingMsgs.messages.map((message, idx) => {
            return message.memberId == chattingMsgs.opponentMemberId ? (
              <YourChattingMsg key={idx} message={message} />
            ) : (
              <MyChattingMsg key={idx} message={message} />
            );
          })}
        </div>
        <div className={style.bottom} onClick={sendMessage}>
          <ChattingInput />
        </div>
      </div>
    </>
  );
};

export default ChattingRoom;
