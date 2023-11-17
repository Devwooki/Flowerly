import { useState, useEffect } from "react";
import style from "./style/MyChattingMsg.module.css";

import ParticipationInfo from "./ParticipationInfo";
import OrderFormMsg from "./OrderFormMsg";
import RequestMsg from "./RequestMsg";
import PaymentMsg from "./PaymentMsg";
import ImageMsg from "./ImageMsg";
import PaymentCompleteMsg from "./PaymentCompleteMsg";

type ChattingMsgProps = {
  message: {
    messageId: string;
    sendTime: string;
    content: string;
    type: string;
  };
  chattingId: number;
  isValidRoom: boolean;
  modalHandler: Function;
  imageLoadHandler: Function;
  lastRequestMsgId: string | null;
};

const MyChattingMsg: React.FC<ChattingMsgProps> = ({
  message,
  chattingId,
  isValidRoom,
  modalHandler,
  imageLoadHandler,
  lastRequestMsgId,
}) => {
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const timeStr = message.sendTime.replaceAll(".", "/");
    const dateTime = new Date(timeStr);
    setTime(dateTime.getHours() + ":" + String(dateTime.getMinutes()).padStart(2, "0"));

    const today = new Date();
    // console.log(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
    if (
      today.getFullYear() != dateTime.getFullYear() ||
      today.getMonth() != dateTime.getMonth() ||
      today.getDate() != dateTime.getDate()
    ) {
      setDate(
        dateTime.getFullYear().toString().slice(-2) +
          "." +
          (dateTime.getMonth() + 1).toString().padStart(2, "0") +
          "." +
          dateTime.getDate().toString().padStart(2, "0"),
      );
    }
    /* eslint-disable-next-line */
  }, []);

  return (
    <div className={style.wrapper} id={message.messageId}>
      <div className={style.timeDiv}>
        {/* <div>{date && date}</div> */}
        <div>{time}</div>
      </div>
      {message.type === "PARTICIPATION" ? (
        <ParticipationInfo chattingId={chattingId} modalHandler={modalHandler} />
      ) : message.type === "ORDER_FORM" ? (
        <OrderFormMsg modalHandler={modalHandler} isValidRoom={isValidRoom} />
      ) : message.type === "ORDER_COMPLETE" ? (
        <RequestMsg isLast={lastRequestMsgId == message.messageId} modalHandler={modalHandler} />
      ) : message.type === "PAYMENT_FORM" ? (
        <PaymentMsg chattingId={chattingId} isValidRoom={isValidRoom} />
      ) : message.type === "IMAGE" ? (
        <ImageMsg
          imgUrl={message.content}
          onImageLoad={imageLoadHandler}
          modalHandler={modalHandler}
        />
      ) : message.type === "PAYMENT_COMPLETE" ? (
        <PaymentCompleteMsg chattingId={chattingId} />
      ) : (
        <div className={style.contentDiv}>{message.content}</div>
      )}
    </div>
  );
};

export default MyChattingMsg;
