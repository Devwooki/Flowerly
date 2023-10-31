import React from "react";
import style from "./style/ChattingRoom.module.css";

type ChattingRoomProps = {
  chattingId: number;
};

const ChattingRoom: React.FC<ChattingRoomProps> = ({ chattingId }) => {
  return (
    <>
      <div className={style.rooomBg}>{chattingId}번 방</div>
    </>
  );
};

export default ChattingRoom;
