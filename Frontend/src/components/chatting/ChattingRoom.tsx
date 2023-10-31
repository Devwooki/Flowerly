import React, { useState } from "react";
import style from "./style/ChattingRoom.module.css";
import { useRouter } from "next/router";

import ChattingInput from "./ChattingInput";
import MyChattingMsg from "./MyChattingMsg";
import YourChattingMsg from "./YourChattingMsg";

type ChattingRoomProps = {
  chattingId: number;
};

const ChattingRoom: React.FC<ChattingRoomProps> = ({ chattingId }) => {
  const route = useRouter();
  // axios로 받아야 함!!
  // chattingId
  // opponentMemberId
  // opponent
  // [List]
  // [
  // createdAt
  // memberId
  // content
  // type
  // ]
  const [chattingMsgs, setChattingMsgs] = useState({
    chattingId: chattingId,
    opponentMemberId: 1,
    opponentName: "아름다운 꽃가게",
    messages: [
      {
        memberId: 999,
        createdAt: "2023-10-31 12:00",
        content: "",
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

  const moveBack = () => {
    route.back();
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
        <div className={style.container}>
          {chattingMsgs.messages.map((message, idx) => {
            return message.memberId == chattingMsgs.opponentMemberId ? (
              <YourChattingMsg key={idx} message={message} />
            ) : (
              <MyChattingMsg key={idx} message={message} />
            );
          })}
        </div>
        <div className={style.bottom}>
          <ChattingInput />
        </div>
      </div>
    </>
  );
};

export default ChattingRoom;
