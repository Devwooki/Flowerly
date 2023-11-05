import { useState } from "react";
import style from "./YourChattingMsg.module.css";

import ParticipationInfo from "./ParticipationInfo";
import OrderFormMsg from "./OrderFormMsg";
import RequestMsg from "./RequestMsg";
import PaymentMsg from "./PaymentMsg";
import ImageMsg from "./ImageMsg";

type ChattingMsgProps = {
  message: {
    sendTime: string;
    content: string;
    type: string;
  };
  chattingId: number;
  modalHandler: Function;
  imageLoadHandler: Function;
};

const YourChattingMsg: React.FC<ChattingMsgProps> = ({
  message,
  chattingId,
  modalHandler,
  imageLoadHandler,
}) => {
  const [time, setTime] = useState(new Date(message.sendTime));

  return (
    <>
      <div className={style.wrapper}>
        {message.type === "PARTICIPATION" ? (
          <ParticipationInfo chattingId={chattingId} modalHandler={modalHandler} />
        ) : message.type === "ORDER_FORM" ? (
          <OrderFormMsg modalHandler={modalHandler} />
        ) : message.type === "ORDER_COMPLETE" ? (
          <RequestMsg modalHandler={modalHandler} />
        ) : message.type === "PAYMENT_FORM" ? (
          <PaymentMsg chattingId={chattingId} />
        ) : message.type === "IMAGE" ? (
          <ImageMsg imgUrl={message.content} onImageLoad={imageLoadHandler} />
        ) : (
          <div className={style.contentDiv}>{message.content}</div>
        )}
        <div className={style.timeDiv}>
          {time.getHours()}:{String(time.getMinutes()).padStart(2, "0")}
        </div>
      </div>
    </>
  );
};

export default YourChattingMsg;
