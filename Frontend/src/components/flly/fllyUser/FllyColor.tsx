import React from "react";
import style from "./FllyColor.module.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { colorState } from "@/recoil/fllyRecoil";
import Image from "next/image";

const FllySeller = () => {
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
        addValue(e);
      }
      
    }
  };
  console.log(color);

  const initValue = () => {
    setSelected([]); // selected 배열을 빈 배열로 초기화
    setColor([]); // Recoil 상태 역시 초기화
    console.log("초기화???",selected);
  };
  

  const subValue = (value:string) => {
    const updatedSelect = selected.filter(item => item !== value);
    setSelected(updatedSelect);
    setColor(updatedSelect);
  }

  const addValue = (newValue:string) => {
    console.log("add ", selected);
    const updatedSelected = [...selected, newValue];
    setSelected(updatedSelected);
    setColor(updatedSelected); // Recoil 상태 업데이트를 이곳으로 옮깁니다.
  };
  

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.contentBox}>
          <div className={style.progress}>
            <div className={style.progressBar}><div className={style.barCompleted}></div><div className={style.barWating}></div></div>
            <div className={style.progressNum}>3/3</div>
          </div>
          <div className={style.headerTitle}>
            <div className={style.stage}>3</div>
            <div className={style.guide}>색상을 선택해주세요.</div>
          </div>
          <div className={style.selectBox}>
            {selectList.map((item, index) => (
              <div key={index} style={{ backgroundColor: colorList[index] }} className={style.selectedCard} onClick={() => {handleSelect(item)}}>
                <div className={style.selectWord}>{item}</div>
              </div>
            ))}            
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

export default FllySeller;
