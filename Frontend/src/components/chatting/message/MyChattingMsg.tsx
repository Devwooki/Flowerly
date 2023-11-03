import { useState } from "react";
import style from "./MyChattingMsg.module.css";

import ParticipationInfo from "./ParticipationInfo";
import OrderFormMsg from "./OrderFormMsg";
import RequestMsg from "./RequestMsg";

type ChattingMsgProps = {
  message: {
<<<<<<< Updated upstream
    sendTime: string;
=======
    createdAt: string;
>>>>>>> Stashed changes
    content: string;
    type: string;
  };
  chattingId: number;
  modalHandler: Function;
};

const MyChattingMsg: React.FC<ChattingMsgProps> = ({ message, chattingId, modalHandler }) => {
<<<<<<< Updated upstream
  const [time, setTime] = useState(new Date(message.sendTime));
=======
  const [time, setTime] = useState(new Date(message.createdAt));
>>>>>>> Stashed changes

  return (
    <div className={style.wrapper}>
      <div className={style.timeDiv}>
        {time.getHours()}:{String(time.getMinutes()).padStart(2, "0")}
      </div>
      {message.type === "PARTICIPATION" ? (
        <ParticipationInfo chattingId={chattingId} modalHandler={modalHandler} />
      ) : message.type === "ORDER_FORM" ? (
        <OrderFormMsg modalHandler={modalHandler} />
      ) : message.type === "ORDER_COMPLETE" ? (
        <RequestMsg modalHandler={modalHandler} />
      ) : (
        <div className={style.contentDiv}>{message.content}</div>
      )}
    </div>
  );
};

export default MyChattingMsg;
