import React from "react";
import style from "./style/ChattingRoom.module.css";
import { useRouter } from "next/router";

type ChattingRoomProps = {
  chattingId: number;
};

const ChattingRoom: React.FC<ChattingRoomProps> = ({ chattingId }) => {
  const route = useRouter();
  const moveBack = () => {
    route.back();
  };
  return (
    <>
      <button onClick={() => moveBack()}>리스트로 돌아가기</button>
      <div className={style.rooomBg}>{chattingId}번 방</div>
    </>
  );
};

export default ChattingRoom;
