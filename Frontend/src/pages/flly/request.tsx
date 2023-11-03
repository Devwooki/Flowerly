import React, { useEffect } from "react";
import style from "@/components/flly/fllyUser/FllyRequest.module.css"
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { situationState, targetState, colorState, flowerState, bouquetState } from "@/recoil/fllyRecoil";
import Image from "next/image";
import { useRouter } from "next/router";

const FllyTarget = () => {
  const router = useRouter();
  const situation = useRecoilValue(situationState);
  const target = useRecoilValue(targetState);
  const colors = useRecoilValue(colorState);
  const flowers = useRecoilValue(flowerState);
  const bouquet = useRecoilValue(bouquetState);
  
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
          <Image src={bouquet.url} alt="flower image" width={200} height={200}></Image>
          <div className={style.requestArea}>
            <table>
              <tr>
                <th>이벤트 상황</th>
                <tr>{situation}상황</tr>
              </tr>
              <tr>
                <th>이벤트 대상</th>
                <tr>{target}</tr>
              </tr>
              <tr>
                <th>색상</th>
                <td></td>
              </tr>
            </table>
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
