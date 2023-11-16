import { useEffect, useState } from "react";
import style from "./style/ChattingInput.module.css";
import Image from "next/image";

type ChattingInputProps = {
  sendHandler: Function;
  menuHandler: Function;
  isValidRoom: boolean | undefined;
};

const ChattingInput: React.FC<ChattingInputProps> = ({ sendHandler, menuHandler, isValidRoom }) => {
  const [sendMsg, setSendMsg] = useState("");
  const [valid, setValid] = useState();
  const sendMessage = () => {
    if (sendMsg.trim() != "") {
      sendHandler(sendMsg);
      setSendMsg("");
    }
  };

  useEffect(() => {
    console.log(isValidRoom);
  }, []);

  return (
    <>
      <div className={style.inputMain}>
        <div className={style.left}>
          {isValidRoom ? (
            <Image
              src="/img/icon/chatting-plus.png"
              width={22}
              height={22}
              alt="채팅 메뉴 버튼"
              onClick={() => menuHandler()}
            />
          ) : (
            <Image
              className={style.disabled}
              src="/img/icon/chatting-plus.png"
              width={22}
              height={22}
              alt="채팅 메뉴 버튼"
            />
          )}
        </div>
        {isValidRoom ? (
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
        ) : (
          <div className={`${style.right} ${style.disabled}`}>
            <input
              type="text"
              className={style.messageInput}
              placeholder="채팅이 불가합니다."
              disabled
            ></input>
            <div className={style.sendBtn}>
              <Image
                src="/img/icon/chatting-send.png"
                width={22}
                height={22}
                alt="메세지 전송 버튼"
              />
            </div>
          </div>
        )}
        {/* <div className={style.right}></div> */}
      </div>
    </>
  );
};

export default ChattingInput;
