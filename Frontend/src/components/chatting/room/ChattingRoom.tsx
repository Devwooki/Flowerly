import React, { useState, useEffect, useRef } from "react";
import style from "./style/ChattingRoom.module.css";
import { useRouter } from "next/router";
import axios from "axios";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import { useInView } from "react-intersection-observer";

import ChattingInput from "./ChattingInput";
import MyChattingMsg from "../message/MyChattingMsg";
import YourChattingMsg from "../message/YourChattingMsg";
import ChattingMenu from "./ChattingMenu";
import FllyDetailModal from "../modal/FllyDetailModal";
import PickupOrderModal from "../modal/PickupOrderModal";
import DeliveryOrderModal from "../modal/DeliveryOrderModal";
import RequestModal from "../modal/RequestModal";
import ImageModal from "../modal/ImageModal";

type ChattingRoomProps = {
  chattingId: number;
};

type Message = {
  messageId: string;
  memberId: number;
  type: string;
  content: string;
  sendTime: string;
};

type ChattingMsg = {
  chattingId: number;
  opponentMemberId: number;
  opponentName: string;
  lastId: string;
  messages: Message[];
};

const ChattingRoom: React.FC<ChattingRoomProps> = ({ chattingId }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const route = useRouter();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [chattingMsgs, setChattingMsgs] = useState<ChattingMsg>();
  const [initialLoading, setInitialLoading] = useState(true);
  const [infiniteScrolling, setInfiniteScrolling] = useState(false);
  const [messageTopRef, inView] = useInView({
    threshold: 0,
    skip: initialLoading, // 초기 로딩 중에는 useInView를 스킵합니다.
  });
  const [prevLastId, setPrevLastId] = useState<string | null>();
  const [sendImage, setSendImage] = useState(false);
  const [lastRequestMsgId, setLastRequestMsgId] = useState<string | null>(null);

  const axiosHandler = async () => {
    await axios.get(`https://flower-ly.co.kr/api/chatting/${chattingId}`).then((response) => {
      const responseData = response.data.data;
      setChattingMsgs({
        chattingId: responseData.chattingId,
        opponentMemberId: responseData.opponentMemberId,
        opponentName: responseData.opponentName,
        lastId: responseData.lastId,
        messages: addDateMsg(responseData.messages),
      });
    });
  };

  useEffect(() => {
    // console.log("첫 렌더링");

    // SockJS와 STOMP 설정
    // const socket = new SockJS("http://localhost:6090/stomp-chat"); // 로컬 테스트용
    const socket = new SockJS("https://flower-ly.co.kr/stomp-chat"); // 배포용
    const client = new Client({
      webSocketFactory: () => socket,
    });

    client.onConnect = () => {
      axiosHandler();

      console.log(chattingId, "Connected");
      // 특정 채팅방의 메세지를 구독
      client.subscribe(`/sub/message/${chattingId}`, (message) => {
        // console.log(message.body);
        const newMsgJson = JSON.parse(message.body);
        const newMsg = {
          messageId: "",
          memberId: newMsgJson.memberId,
          type: newMsgJson.type,
          content: newMsgJson.content,
          sendTime: String(new Date()),
        };

        setChattingMsgs((prevState) => {
          if (!prevState) {
            return {
              chattingId: 0,
              opponentMemberId: 0,
              lastId: "",
              opponentName: "",
              messages: [newMsg],
            };
          }

          return {
            ...prevState,
            messages: addDateMsg([...prevState.messages, newMsg]),
          };
        });
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

    setInitialLoading(false);
    scrollDown();

    // 컴포넌트 unmount 시 연결 종료
    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    // console.log("무한스크롤");
    if (inView && !initialLoading && chattingMsgs?.lastId) {
      setInfiniteScrolling(true);
      setPrevLastId(chattingMsgs.lastId);

      axios
        .get(`https://flower-ly.co.kr/api/chatting/${chattingId}?lastId=${chattingMsgs?.lastId}`)
        .then((response) => {
          console.log(response.data.data);
          setChattingMsgs((prev: any) => {
            return {
              ...prev,
              lastId: response.data.data.lastId,
              messages: addDateMsg([...response.data.data.messages, ...prev!.messages]),
            };
          });
        });
    }
  }, [inView]);

  useEffect(() => {
    if (prevLastId && !initialLoading && inView) {
      // console.log("스크롤 위치 조정");

      requestAnimationFrame(() => {
        // containerRef.current!.scrollTop = containerRef.current!.scrollHeight - prevScrollHeight;
        const currentElement = document.getElementById(prevLastId);
        console.log(currentElement?.id);
        currentElement?.scrollIntoView({ behavior: "auto" });
      });
    }
  }, [chattingMsgs]);

  const addDateMsg = (messages: Message[]) => {
    // console.log("addDateMsg");
    const newMessges: Message[] = [];
    // let lastDate = new Date(messages[0].sendTime.replaceAll(".", "/"));
    let lastDate;

    for (const message of messages) {
      if (message.type == "DATE") continue;
      if (message.type == "ORDER_COMPLETE") setLastRequestMsgId(message.messageId);

      const sendTime = new Date(message.sendTime.replaceAll(".", "/"));

      if (
        !lastDate ||
        sendTime.getFullYear() != lastDate.getFullYear() ||
        sendTime.getMonth() != lastDate.getMonth() ||
        sendTime.getDate() != lastDate.getDate()
      ) {
        // 새로운 날짜가 시작될 때 그룹을 추가
        newMessges.push({
          messageId: "",
          memberId: -1,
          type: "DATE",
          content:
            sendTime.getFullYear().toString() +
            "년 " +
            (sendTime.getMonth() + 1).toString() +
            "월 " +
            sendTime.getDate().toString() +
            "일",
          sendTime: message.sendTime,
        });

        lastDate = sendTime;
      }

      newMessges.push(message);
    }

    // console.log(newMessges);
    return newMessges;
  };

  const imageLoadHandler = () => {
    // console.log("imageLoadHandler");
    if (!infiniteScrolling) scrollDown(); // 이미지  로딩 완료되면 스크롤 조정
    if (sendImage) {
      scrollDown();
      setSendImage(false);
    }
  };

  const moveBack = () => {
    route.back();
  };

  const scrollDown = () => {
    // console.log("scrollDown");
    messageEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const sendMessage = (type: string, content: string) => {
    const destination = `/pub/message/${chattingId}`;
    const stompChatRequest = {
      chattingId,
      memberId: 1,
      type: type,
      content: content,
    };
    const body = JSON.stringify(stompChatRequest);

    if (stompClient && stompClient.connected) {
      stompClient.publish({ destination, body });
      // console.log("메세지 보내기 성공");
    }

    if (type === "IMAGE") setSendImage(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollDown();
      });
    });
  };

  // 타입별 메세지 전송 관련
  const sendTextMessage = (content: string) => {
    sendMessage("TEXT", content);
  };
  const changeMenuOpen = () => {
    setMenuOpen(!menuOpen);

    if (menuOpen) {
      containerRef.current!.scrollTop -= 120;
    } else {
      if (
        containerRef.current!.scrollTop >=
        containerRef.current!.scrollHeight - containerRef.current!.clientHeight - 120
      ) {
        requestAnimationFrame(() => {
          scrollDown(); // 스크롤이 최대 크기를 넘어가는 경우
        });
      } else {
        containerRef.current!.scrollTop += 120;
      }
    }
  };
  const sendOrderForm = () => {
    sendMessage("ORDER_FORM", "주문 유형을 선택해주세요.");
  };
  const sendRequestMsg = () => {
    sendMessage("ORDER_COMPLETE", "주문서가 도착했습니다.");
  };
  const sendPaymentReqMsg = () => {
    // console.log("sendPaymentReqMsg");
    sendMessage("PAYMENT_FORM", "결제를 요청하였습니다.");
  };
  const sendImageMsg = (imgUrl: string) => {
    sendMessage("IMAGE", imgUrl);
  };

  // 모달 상태 관련
  const [fllyModalState, setFllyModalState] = useState(false);
  const [pickupModalState, setPickupModalState] = useState(false);
  const [deliveryModalState, setDeliveryModalState] = useState(false);
  const [requestModalState, setRequestModalState] = useState(false);
  const [imageModalState, setImageModalState] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>();

  const modalHandler = (modalType: string, state: boolean, data: string) => {
    if (modalType == "FLLY") {
      setFllyModalState(state);
    } else if (modalType == "PICKUP") {
      setPickupModalState(state);
    } else if (modalType == "DELIVERY") {
      setDeliveryModalState(state);
    } else if (modalType == "REQUEST") {
      setRequestModalState(state);
    } else if (modalType == "IMAGE") {
      setImageModalState(state);
      setImgUrl(data);
    }
  };

  return (
    <>
      <div className={style.rooomBg}>
        <div className={style.header}>
          <div className={style.backBtn} onClick={() => moveBack()}>
            &lt;
          </div>
          <div className={style.chattingName}>{chattingMsgs && chattingMsgs.opponentName}</div>
        </div>
        <div
          className={menuOpen ? style.containerWithMenu : style.container}
          onClick={() => {
            if (menuOpen) changeMenuOpen();
          }}
          ref={containerRef}
        >
          <div ref={messageTopRef}></div>
          {chattingMsgs &&
            chattingMsgs.messages.map((message, idx) => {
              return message.type == "DATE" ? (
                <div className={style.dateDiv}>{message.content}</div>
              ) : message.memberId == chattingMsgs.opponentMemberId ? (
                <YourChattingMsg
                  key={idx}
                  message={message}
                  chattingId={chattingId}
                  modalHandler={modalHandler}
                  imageLoadHandler={imageLoadHandler}
                  lastRequestMsgId={lastRequestMsgId}
                />
              ) : (
                <MyChattingMsg
                  key={idx}
                  message={message}
                  chattingId={chattingId}
                  modalHandler={modalHandler}
                  imageLoadHandler={imageLoadHandler}
                  lastRequestMsgId={lastRequestMsgId}
                />
              );
            })}
          <div ref={messageEndRef}></div> {/* 스크롤 맨아래로 설정하기 위한 빈 div */}
        </div>
        <div className={style.bottom}>
          <ChattingInput sendHandler={sendTextMessage} menuHandler={changeMenuOpen} />
          {menuOpen && (
            <ChattingMenu sendOrderFormHandler={sendOrderForm} sendImgHandler={sendImageMsg} />
          )}
        </div>
      </div>
      {fllyModalState && <FllyDetailModal chattingId={chattingId} modalHandler={modalHandler} />}
      {pickupModalState && (
        <PickupOrderModal
          chattingId={chattingId}
          modalHandler={modalHandler}
          sendHandler={sendRequestMsg}
        />
      )}
      {deliveryModalState && (
        <DeliveryOrderModal
          chattingId={chattingId}
          modalHandler={modalHandler}
          sendHandler={sendRequestMsg}
        />
      )}
      {requestModalState && (
        <RequestModal
          chattingId={chattingId}
          modalHandler={modalHandler}
          sendHandler={sendPaymentReqMsg}
        />
      )}
      {imageModalState && <ImageModal modalHandler={modalHandler} imgUrl={imgUrl} />}
    </>
  );
};

export default ChattingRoom;
