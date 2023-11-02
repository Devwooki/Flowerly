import { useState } from "react";
import style from "./style/MyChattingMsg.module.css";

import ParticipationForm from "./ParticipationForm";

type ChattingMsgProps = {
  message: {
    createdAt: string;
    content: string;
    type: string;
  };
};

const MyChattingMsg: React.FC<ChattingMsgProps> = ({ message }) => {
  const [time, setTime] = useState(new Date(message.createdAt));

  return (
    <div className={style.wrapper}>
      <div className={style.timeDiv}>
        {time.getHours()}:{String(time.getMinutes()).padStart(2, "0")}
      </div>
      {message.type === "TEXT" ? (
        <div className={style.contentDiv}>{message.content}</div>
      ) : (
        <ParticipationForm />
      )}
    </div>
  );
};

export default MyChattingMsg;
