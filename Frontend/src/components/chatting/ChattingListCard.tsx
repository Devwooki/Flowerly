import React from "react";

import style from "./style/ChattingListCard.module.css";

type ChattingProps = {
  chattingData: {
    chattingId: number;
    lastChattingTime: string;
    lastChattingMessage: string;
    opponentMemberId: number;
    opponentName: string;
  };
};

const ChattingListCard: React.FC<ChattingProps> = ({ chattingData }) => {
  return (
    <>
      <div className={style.cardMain}>
        <div className={style.cardTop}>
          <div className={style.opponentName}>{chattingData.opponentName}</div>
          <div className={style.time}>{chattingData.lastChattingTime}</div>
        </div>
        <div className={style.cardBottom}>
          <div>{chattingData.lastChattingMessage}</div>
        </div>
      </div>
    </>
  );
};

export default ChattingListCard;
