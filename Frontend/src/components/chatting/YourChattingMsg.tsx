import { useState } from "react";
import style from "./style/YourChattingMsg.module.css";

import ParticipationForm from "./ParticipationForm";

type ChattingMsgProps = {
  message: {
    createdAt: string;
    content: string;
    type: string;
  };
};

const YourChattingMsg: React.FC<ChattingMsgProps> = ({ message }) => {
  const [time, setTime] = useState(new Date(message.createdAt));

  return (
    <>
      <div className={style.wrapper}>
        {message.type === "TEXT" ? (
          <div className={style.contentDiv}>{message.content}</div>
        ) : (
          <ParticipationForm />
        )}
        <div className={style.timeDiv}>
          {time.getHours()}:{String(time.getMinutes()).padStart(2, "0")}
        </div>
      </div>
    </>
  );
};

export default YourChattingMsg;
