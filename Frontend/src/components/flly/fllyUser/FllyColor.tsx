import React from "react";
import style from "./FllyColor.module.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { colorState } from "@/recoil/fllyRecoil";
import Image from "next/image";

const FllyColor = () => {
  const [color, setColor] = useRecoilState(colorState);
  const [selected, setSelected] = useState<string[]>([]);
  const selectList = ["빨간색", "주황색", "분홍색", "노랑색", "파란색", "보라색", "흰색", "선택안함"];
  const colorList = ["#DB4455", "#F67828", "#FFC5BF", "#FBE870", "#0489DD", "#CE92D8", "#FFFFFF", "#DADADA"];
  const handleSelect = (e:string) => {
    if(e=="선택안함") {
      const included = selected.includes(e)? true: false;
      if(included) {
        setSelected([]);
        setColor([]);
      } else {
        const updatedSelected = [e] as string[];
        setSelected(updatedSelected);
        setColor(updatedSelected);
      }
    } else {
      if(selected.includes(e)) {
       subValue(e);
      } else if(selected.length < 3) {
        if(selected.includes("선택안함")) {
          addValue(e, true);
        } else addValue(e, false);
      }
    }
  };
  console.log(color);
  
  const subValue = (value:string) => {
    const updatedSelect = selected.filter(item => item !== value);
    setSelected(updatedSelect);
    setColor(updatedSelect);
  }

  const addValue = (newValue:string, hasNo:boolean) => {
    if(hasNo) {
      const updatedSelected = [...selected.filter(item => item !== "선택안함"), newValue];
      setSelected(updatedSelected);
      setColor(updatedSelected);
    } else {
      const updatedSelected = [...selected, newValue];
      setSelected(updatedSelected);
      setColor(updatedSelected); // Recoil 상태 업데이트를 이곳으로 옮깁니다.
    }
  };
  

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.contentBox}>
          <div className={style.progress}>
            <div className={style.progressBar}><div className={style.barCompleted}></div></div>
            <div className={style.progressNum}>3/3</div>
          </div>
          <div className={style.headerTitle}>
            <div className={style.stage}>3</div>
            <div className={style.guide}>색상을 선택해주세요.</div>
          </div>
          <div className={style.guidePlus}>최대 3개까지 선택 가능합니다.</div>
          <div className={style.selectAreaBox}>
            <div className={style.selectBox}>
              {selectList.map((item, index) => (
                <div key={index} style={{ backgroundColor: colorList[index] }} className={style.selectCard} onClick={() => {handleSelect(item)}}>
                  <div className={style.selectWord}>{item}</div>
                  <div className={item != "흰색"? style.selectCheck : style.selectCheckWhite}>
                    {selected.includes(item) && (
                      <Image src="/img/icon/check.png" width={24} height={18} alt="아이콘" />
                    )}
                  </div>
                </div>
              ))}            
            </div>
            </div>
          <div className={style.btnBox}>
            <div className={style.prevBtn}>&lt;</div>
            <div className={style.nextBtn}>다음</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyColor;
