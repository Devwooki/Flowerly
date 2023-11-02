import { useState } from "react";
import style from "./ChattingInput.module.css";
import Image from "next/image";

type ChattingInputProps = {
  sendHandler: Function;
  menuHandler: Function;
};

const ChattingInput: React.FC<ChattingInputProps> = ({ sendHandler, menuHandler }) => {
  const [sendMsg, setSendMsg] = useState("");
  const sendMessage = () => {
    if (sendMsg.trim() != "") {
      sendHandler(sendMsg);
      setSendMsg("");
    }
  };

  return (
    <>
      <div className={style.inputMain}>
        <div className={style.left}>
          <Image
            src="/img/icon/chatting-plus.png"
            width={22}
            height={22}
            alt="채팅 메뉴 버튼"
            onClick={() => menuHandler()}
          />
        </div>
        <div className={style.right}>
          <input
            type="text"
            className={style.messageInput}
            value={sendMsg}
            onChange={(e) => {
              setSendMsg(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") sendMessage();
            }}
          ></input>
          <div className={style.sendBtn}>
            <Image
              src="/img/icon/chatting-send.png"
              width={22}
              height={22}
              alt="메세지 전송 버튼"
              onClick={sendMessage}
            />
          </div>
        </div>
        {/* <div className={style.right}></div> */}
      </div>
    </>
  );
};

export default ChattingInput;
