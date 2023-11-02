import React, { useState, useEffect, useRef } from "react";
import style from "./ChattingRoom.module.css";
import { useRouter } from "next/router";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import ChattingInput from "./ChattingInput";
import MyChattingMsg from "../message/MyChattingMsg";
import YourChattingMsg from "../message/YourChattingMsg";
import ChattingMenu from "./ChattingMenu";
import FllyDetailModal from "../modal/FllyDetailModal";
import PickupOrderModal from "../modal/PickupOrderModal";
import DeliveryOrderModal from "../modal/DeliveryOrderModal";

type ChattingRoomProps = {
  chattingId: number;
};

const ChattingRoom: React.FC<ChattingRoomProps> = ({ chattingId }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const route = useRouter();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // axios로 받아야 함!!
  const [chattingMsgs, setChattingMsgs] = useState({
    chattingId: chattingId,
    opponentMemberId: 1,
    // opponentMemberId: 999,
    opponentName: "아름다운 꽃가게",
    messages: [
      {
        memberId: 999,
        createdAt: "2023-10-31 12:00",
        content: "해당 상품에 관심을 가지고 있습니다.",
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

  useEffect(() => {
    // SockJS와 STOMP 설정
    // const socket = new SockJS("http://localhost:6090/stomp-chat"); // 로컬 테스트용
    const socket = new SockJS("https://flower-ly.co.kr/stomp-chat"); // 배포용
    const client = new Client({
      webSocketFactory: () => socket,
    });

    client.onConnect = (frame) => {
      console.log(chattingId, "Connected");
      // 특정 채팅방의 메세지를 구독
      client.subscribe(`/sub/message/${chattingId}`, (message) => {
        // console.log(message.body);
        const newMsgJson = JSON.parse(message.body);
        const newMsg = {
          memberId: newMsgJson.memberId,
          type: newMsgJson.type,
          content: newMsgJson.content,
          createdAt: String(new Date()),
        };
        setChattingMsgs((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, newMsg],
        }));
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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chattingMsgs, menuOpen]);

  const moveBack = () => {
    route.back();
  };

  const sendMessage = (type: string, content: string) => {
    const destination = `/pub/message/${chattingId}`;
    const stompChatRequest = {
      chattingId,
      memberId: 999,
      // memberId: 1,
      type: type,
      content: content,
    };
    const body = JSON.stringify(stompChatRequest);

    if (stompClient && stompClient.connected) {
      stompClient.publish({ destination, body });
      // console.log("메세지 보내기 성공");
    }
  };

  const sendTextMessage = (content: string) => {
    sendMessage("TEXT", content);
  };

  const changeMenuOpen = () => {
    // console.log(menuOpen);
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    if (menuOpen) changeMenuOpen();
  };

  const sendOrderForm = () => {
    sendMessage("ORDER_FORM", "주문 유형을 선택해주세요.");
  };

  const sendRequestMsg = () => {
    sendMessage("ORDER_COMPLETE", "주문서가 도착했습니다.");
  };

  const [fllyModalState, setFllyModalState] = useState(false);
  const [fllyId, setFllyId] = useState<number>();
  const [pickupModalState, setPickupModalState] = useState(false);
  const [deliveryModalState, setDeliveryModalState] = useState(false);
  const [requestModalState, setRequestModalState] = useState(false);
  const modalHandler = (modalType: string, state: boolean, data: number) => {
    if (modalType == "FLLY") {
      setFllyId(data);
      setFllyModalState(state);
    } else if (modalType == "PICKUP") {
      setPickupModalState(state);
    } else if (modalType == "DELIVERY") {
      setDeliveryModalState(state);
    } else if (modalType == "REQUEST") {
      setRequestModalState(state);
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
        <div className={menuOpen ? style.containerWithMenu : style.container} onClick={closeMenu}>
          {chattingMsgs.messages.map((message, idx) => {
            return message.memberId == chattingMsgs.opponentMemberId ? (
              <YourChattingMsg
                key={idx}
                message={message}
                chattingId={chattingId}
                modalHandler={modalHandler}
              />
            ) : (
              <MyChattingMsg
                key={idx}
                message={message}
                chattingId={chattingId}
                modalHandler={modalHandler}
              />
            );
          })}
          <div ref={messageEndRef}></div> {/* 스크롤 맨아래로 설정하기 위한 빈 div */}
        </div>
        <div className={style.bottom}>
          <ChattingInput sendHandler={sendTextMessage} menuHandler={changeMenuOpen} />
          {menuOpen && <ChattingMenu sendOrderFormHandler={sendOrderForm} />}
        </div>
      </div>
      {fllyModalState && <FllyDetailModal fllyId={fllyId} modalHandler={modalHandler} />}
      {pickupModalState && (
        <PickupOrderModal modalHandler={modalHandler} sendHandler={sendRequestMsg} />
      )}
      {deliveryModalState && (
        <DeliveryOrderModal modalHandler={modalHandler} sendHandler={sendRequestMsg} />
      )}
    </>
  );
};

export default ChattingRoom;
