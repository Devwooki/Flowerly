import React from "react";
import style from "./FllySituation.module.css";
import { useState } from "react";
import { useRecoilState } from "recoil";


const FllySeller = () => {  
  const [selected, setSelected] = useState<string>("");
  const selectList = ["친구", "연인", "부모님", "가족", "선생님", "동료", "나", "선택안함"];
  const handleSelect = (e:string) => {
    setSelected(e);
  };
  // console.log(selectList[3]);

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.contentBox}>
          <div className={style.progress}>
            <div className={style.progressBar}><div className={style.barCompleted}></div><div className={style.barWating}></div></div>
            <div className={style.progressNum}>2/3</div>
          </div>
          <div className={style.headerTitle}>
            <div className={style.stage}>2</div>
            <div className={style.guide}>선물할 대상을 선택해주세요.</div>
          </div>
          <div className={style.selectBox}>
            {selectList.map((item, index) => (
              <div key={index} className={style.selectCard} onClick={() => {handleSelect(item)}}>{item}</div>
            ))}            
          </div>
          <div className={style.nextBtn}>다음</div>
        </div>
      </div>
    </>
  );
};

export default FllySeller;
