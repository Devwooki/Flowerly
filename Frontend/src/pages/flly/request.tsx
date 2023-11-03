import React, { useEffect } from "react";
import style from "@/components/flly/fllyUser/FllyRequest.module.css"
import { useState } from "react";
import { useRecoilState } from "recoil";
import { targetState } from "@/recoil/fllyRecoil";
import Image from "next/image";
import { useRouter } from "next/router";

const FllyTarget = () => {
  const router = useRouter();
  
  const handlePrevClick = () => {

  }

  const handleNextClick = () => {

  }

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.contentBox}>
          <div className={style.headerTitle}>
            <div className={style.guide}>플리 의뢰서</div>
          </div>
          <Image src=""alt="flower image"></Image>
          <div className={style.requestArea}>

          </div>
          <div className={style.btnBox}>
            <div onClick={handlePrevClick} className={style.prevBtn}>&lt;</div>
            <div onClick={handleNextClick} className={style.nextBtn}>확인</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyTarget;
