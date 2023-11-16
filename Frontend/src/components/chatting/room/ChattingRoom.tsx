import React, { useState, useEffect, useRef } from "react";
import style from "./style/ChattingRoom.module.css";
import { useRouter } from "next/router";

import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

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
import ReportModal from "../modal/ReportModal";

import { memberInfoState } from "@/recoil/memberInfoRecoil";
import { paymentErrorRecoil } from "@/recoil/paymentRecoil";
import { useRecoilValue, useResetRecoilState } from "recoil";
import Image from "next/image";

import { tokenHttp } from "@/api/tokenHttp";
import { ToastErrorMessage } from "@/model/toastMessageJHM";

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
  isValidRoom: boolean;
  lastId: string;
  messages: Message[];
};

const ChattingRoom: React.FC<ChattingRoomProps> = ({ chattingId }) => {
  const stompClient = useRef<CompatClient | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const memberInfo = useRecoilValue(memberInfoState);
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
    tokenHttp
      .get(`/chatting/${chattingId}`)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.code === 200) {
          const responseData = response.data.data;
          setChattingMsgs({
            chattingId: responseData.chattingId,
            opponentMemberId: responseData.opponentMemberId,
            opponentName: responseData.opponentName,
            isValidRoom: responseData.isValidRoom,
            lastId: responseData.lastId,
            messages: addDateMsg(responseData.messages),
          });
          //요거 필수!! (엑세스 토큰 만료로 재발급 받았다면 바꿔줘!! )
          if (response.headers.authorization) {
            localStorage.setItem("accessToken", response.headers.authorization);
          }
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
  };

  const paymentError = useRecoilValue(paymentErrorRecoil);
  const resetPaymentError = useResetRecoilState(paymentErrorRecoil);

  useEffect(() => {
    // 첫 렌더링

    const accessToken = localStorage.getItem("accessToken")?.substring(7); // Bearer 제거
    // const accessToken =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODY4MzQ4NiwibWVtYmVySWQiOjF9.wU3IYYWErRie5E5s7oIRYMliboyumfMrCZILaKnwlxXxJXCW1kHZ5fJ-mKvsAwYuMV4-UT0F4qoUX9rVcrTiNw"; // 1번
    // const accessToken =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwODc1MjUwMywibWVtYmVySWQiOjJ9.o_v_EVuucqlh2NPfHioqquPjm3U-JTP-7ZP2xJkxIxMsPBMhxnw0DL-Avnh2ryBa_J6JYS7YdCc5dZuMS_9IUw"; // 2번

    // const socket = new SockJS(`http://localhost:6090/stomp-chat`); // 로컬 테스트용
    const socket = new SockJS("https://flower-ly.co.kr/stomp-chat"); // 배포용

    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      {
        Authorization: accessToken,
        chattingId: chattingId,
      },
      () => {
        axiosHandler();

        // 특정 채팅방의 메세지를 구독
        stompClient.current?.subscribe(`/sub/message/${chattingId}`, (message) => {
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
                isValidRoom: true,
                messages: [newMsg],
              };
            }

            return {
              ...prevState,
              messages: addDateMsg([...prevState.messages, newMsg]),
            };
          });
        });
      },
    );

    setInitialLoading(false);
    scrollDown();

    if (paymentError.isError == true) {
      ToastErrorMessage(paymentError.errorMsg);
      resetPaymentError();
    }

    return () => {
      if (stompClient.current && accessToken) {
        stompClient.current.disconnect(
          () => {
            // console.log("Disconnected");
          },
          {
            Authorization: accessToken,
          },
        );
      }
    };
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    // 무한스크롤
    if (inView && !initialLoading && chattingMsgs?.lastId) {
      setInfiniteScrolling(true);
      setPrevLastId(chattingMsgs.lastId);

      tokenHttp
        .get(`/chatting/${chattingId}?lastId=${chattingMsgs.lastId}`)
        .then((response) => {
          if (response.data.code === 200) {
            setChattingMsgs((prev: any) => {
              return {
                ...prev,
                lastId: response.data.data.lastId,
                messages: addDateMsg([...response.data.data.messages, ...prev!.messages]),
              };
            });
            //요거 필수!! (엑세스 토큰 만료로 재발급 받았다면 바꿔줘!! )
            if (response.headers.authorization) {
              localStorage.setItem("accessToken", response.headers.authorization);
            }
          }
        })
        .catch((err) => {
          // console.log(err);
          if (err.response.status === 403) {
            router.push("/fllylogin");
          }
        });
    }
    /* eslint-disable-next-line */
  }, [inView]);

  useEffect(() => {
    // 무한 스크롤 시 위치 조정
    if (prevLastId && !initialLoading && inView) {
      requestAnimationFrame(() => {
        // containerRef.current!.scrollTop = containerRef.current!.scrollHeight - prevScrollHeight;

        const currentElement = document.getElementById(prevLastId);
        currentElement?.scrollIntoView({ behavior: "auto" });
      });
    } else {
      scrollDown();
    }
    /* eslint-disable-next-line */
  }, [chattingMsgs]);

  const addDateMsg = (messages: Message[]) => {
    // 날짜 표시를 위한 함수
    const newMessges: Message[] = [];
    let lastDate;

    for (const message of messages) {
      if (message.type == "DATE") continue;
      if (message.type == "ORDER_COMPLETE") setLastRequestMsgId(message.messageId);

      const sendTime = new Date(message.sendTime?.replaceAll(".", "/"));

      if (
        message.sendTime &&
        (!lastDate ||
          sendTime.getFullYear() != lastDate.getFullYear() ||
          sendTime.getMonth() != lastDate.getMonth() ||
          sendTime.getDate() != lastDate.getDate())
      ) {
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
    // 이미지 로딩 완료되면 스크롤 조정
    if (!infiniteScrolling) scrollDown();
    if (sendImage) {
      scrollDown();
      setSendImage(false);
    }
  };

  const moveBack = () => {
    router.push("/chatting");
  };

  const scrollDown = () => {
    // 스크롤 제일 아래로 조정하는 함수
    messageEndRef.current?.scrollIntoView({ behavior: "auto" });
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
        // 스크롤이 최대 크기를 넘어가는 경우
        requestAnimationFrame(() => {
          scrollDown();
        });
      } else {
        containerRef.current!.scrollTop += 120;
      }
    }
  };

  // ====== 메세지 전송 관련 ======
  const sendMessage = (type: string, content: string) => {
    const destination = `/pub/message/${chattingId}`;
    const stompChatRequest = {
      chattingId,
      // memberId: 2, // 리코일에 든 아이디로 바꾸기
      // memberId: 1,
      memberId: memberInfo.id,
      type: type,
      content: content,
    };
    const body = JSON.stringify(stompChatRequest);

    if (stompClient && stompClient.current) {
      stompClient.current.publish({ destination, body });
      // console.log("메세지 보내기 성공");
    }

    if (type === "IMAGE") setSendImage(true);

    // requestAnimationFrame(() => {
    //   requestAnimationFrame(() => {
    //     scrollDown();
    //   });
    // });
  };

  const sendTextMessage = (content: string) => {
    sendMessage("TEXT", content);
  };
  const sendOrderForm = () => {
    sendMessage("ORDER_FORM", "주문 유형을 선택해주세요.");
  };
  const sendRequestMsg = () => {
    sendMessage("ORDER_COMPLETE", "주문서가 도착했습니다.");
  };
  const sendPaymentReqMsg = () => {
    sendMessage("PAYMENT_FORM", "결제를 요청하였습니다.");
  };
  const sendImageMsg = (imgUrl: string) => {
    sendMessage("IMAGE", imgUrl);
  };

  // ======= 모달 상태 관련 =======
  const [fllyModalState, setFllyModalState] = useState(false);
  const [pickupModalState, setPickupModalState] = useState(false);
  const [deliveryModalState, setDeliveryModalState] = useState(false);
  const [requestModalState, setRequestModalState] = useState(false);
  const [imageModalState, setImageModalState] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>();
  const [reportModalState, setReportModalState] = useState(false);

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
    } else if (modalType == "REPORT") {
      setReportModalState(state);
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
          {memberInfo.role == "USER" && (
            <div className={style.storeBtn}>
              <Image
                src="/img/btn/store-btn.png"
                width={20}
                height={20}
                alt="가게정보"
                onClick={() => {
                  router.push(`/list/shop/${chattingMsgs?.opponentMemberId}`);
                }}
              />
            </div>
          )}
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
              ) : message.type == "INFORMATION" ? (
                <div className={style.informationWrapper}>
                  <div className={style.informationDiv}>{message.content}</div>
                </div>
              ) : message.memberId == chattingMsgs.opponentMemberId ? (
                <YourChattingMsg
                  key={idx}
                  message={message}
                  chattingId={chattingId}
                  isValidRoom={chattingMsgs.isValidRoom}
                  modalHandler={modalHandler}
                  imageLoadHandler={imageLoadHandler}
                  lastRequestMsgId={lastRequestMsgId}
                />
              ) : (
                <MyChattingMsg
                  key={idx}
                  message={message}
                  chattingId={chattingId}
                  isValidRoom={chattingMsgs.isValidRoom}
                  modalHandler={modalHandler}
                  imageLoadHandler={imageLoadHandler}
                  lastRequestMsgId={lastRequestMsgId}
                />
              );
            })}
          <div ref={messageEndRef}></div> {/* 스크롤 맨아래로 설정하기 위한 빈 div */}
        </div>
        <div className={style.bottom}>
          <ChattingInput
            sendHandler={sendTextMessage}
            menuHandler={changeMenuOpen}
            isValidRoom={chattingMsgs?.isValidRoom}
          />
          {menuOpen && (
            <ChattingMenu
              sendOrderFormHandler={sendOrderForm}
              sendImgHandler={sendImageMsg}
              modalHandler={modalHandler}
            />
          )}
        </div>
        {reportModalState && (
          <ReportModal
            memberName={chattingMsgs?.opponentName ? chattingMsgs.opponentName : null}
            modalHandler={modalHandler}
          />
        )}
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
