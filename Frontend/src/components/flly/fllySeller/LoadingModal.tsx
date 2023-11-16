import React, { useEffect, useRef, useState } from "react";
import style from "./style/LoadingModal.module.css";
import Image from "next/image";

const LoadingModal = ({ statetext }: { statetext: string }) => {
  return (
    <div className={style.modalBack}>
      <div className={style.modalBox}>
        <Image src="/img/etc/loading-bouquet.gif" width={150} height={150} alt="로딩중"></Image>
        <div>{statetext}...</div>
      </div>
    </div>
  );
};

export default LoadingModal;
