import React, { useEffect } from "react";
<<<<<<< Updated upstream:Frontend/src/pages/flly/color.tsx
import style from "@/components/flly/fllyUser/FllyColor.module.css"
=======
import style from "./FllyColor.module.css";
>>>>>>> Stashed changes:Frontend/src/components/flly/fllyUser/FllyColor.tsx
import { useState } from "react";
import { useRecoilState } from "recoil";
import { colorState, flowerState } from "@/recoil/fllyRecoil";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const FllyColor = () => {
<<<<<<< Updated upstream:Frontend/src/pages/flly/color.tsx
  const router = useRouter();
  const [check, setCheck] = useState<boolean>(false);
  const [color, setColor] = useRecoilState(colorState);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedFlowers, setSelcetedFlowers] = useRecoilState(flowerState);
=======
  const [color, setColor] = useRecoilState(colorState);
  const [selected, setSelected] = useState<string[]>([]);
>>>>>>> Stashed changes:Frontend/src/components/flly/fllyUser/FllyColor.tsx
  const colorNames = ["RED", "ORANGE", "PINK", "YELLOW", "BLUE", "PURPLE", "WHITE", "선택 안함"]
  const selectList = ["빨간색", "주황색", "분홍색", "노랑색", "파란색", "보라색", "흰색", "선택 안함"];
  const colorList = ["#DB4455", "#F67828", "#FFC5BF", "#FBE870", "#0489DD", "#CE92D8", "#FFFFFF", "#DADADA"];
  const handleSelect = (e:string, index:number) => {
    if(e=="선택 안함") {
      const included = selected.includes(colorNames[index])? true: false;
      if(included) {
        setSelected([]);
        setColor([]);
      } else {
        const updatedSelected = [colorNames[index]] as string[];
        setSelected(updatedSelected);
        setColor(updatedSelected);
      }
    } else {
      if(selected.includes(colorNames[index])) {
       subValue(colorNames[index]);
      } else if(selected.length < 3) {
        if(selected.includes("선택 안함")) {
          addValue(colorNames[index], true);
        } else addValue(colorNames[index], false);
      }
    }
  };
  
  const subValue = (value:string) => {
    const updatedSelect = selected.filter(item => item !== value);
    setSelected(updatedSelect);
    setColor(updatedSelect);
  }

  const addValue = (newValue:string, hasNo:boolean) => {
    if(hasNo) {
      const updatedSelected = [...selected.filter(item => item !== "선택 안함"), newValue];
      setSelected(updatedSelected);
      setColor(updatedSelected);
    } else {
      const updatedSelected = [...selected, newValue];
      setSelected(updatedSelected);
      setColor(updatedSelected); // Recoil 상태 업데이트를 이곳으로 옮깁니다.
    }
  };

  useEffect(() => {
    setSelected(color);
<<<<<<< Updated upstream:Frontend/src/pages/flly/color.tsx
  }, []);

  useEffect(() => {
    if(color.length !== 0) setCheck(true);
  }, [color]);

  const handleClick = () => {
    if(check) {
      setSelcetedFlowers([]);
      router.push("flower");
    }
  };
=======
  })
  
>>>>>>> Stashed changes:Frontend/src/components/flly/fllyUser/FllyColor.tsx

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
                <div key={index} style={{ backgroundColor: colorList[index] }} className={style.selectCard} onClick={() => {handleSelect(item, index)}}>
                  <div className={style.selectWord}>{item}</div>
                  <div className={item != "흰색"? style.selectCheck : style.selectCheckWhite}>
                    {selected.includes(colorNames[index]) && (
                      <Image src="/img/icon/check.png" width={24} height={18} alt="아이콘" />
                    )}
                  </div>
                </div>
              ))}            
            </div>
            </div>
          <div className={style.btnBox}>
            <Link href="/flly/target">
              <div className={style.prevBtn}>&lt;</div>
            </Link>
            <div onClick={handleClick} className={style.nextBtn}>다음</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyColor;
