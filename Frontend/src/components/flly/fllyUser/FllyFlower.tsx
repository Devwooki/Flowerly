import React, { useEffect } from "react";
import style from "./FllyFlower.module.css";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { situationState } from "@/recoil/fllyRecoil";
import { targetState } from "@/recoil/fllyRecoil";
import { colorState } from "@/recoil/fllyRecoil";
import { flowerState } from "@/recoil/fllyRecoil";
import { flowerCardType } from "@/recoil/fllyRecoil";
import Image from "next/image";
import axios from "axios";

const FllyFlower = () => {
  const situation = useRecoilValue(situationState);
  const target = useRecoilValue(targetState);
  const colors = useRecoilValue(colorState);
  const [selectedFlowers, setSelcetedFlowers] = useRecoilState(flowerState);
  const [selected, setSelected] = useState<number[]>([]);
  const [flowers, setFlowers] = useState<flowerCardType[]>([]);
  const [flowersColor, setFlowersColor] = useState<flowerCardType[]>([]);
  const [flowersMeaning, setFlowersMeaning] = useState<flowerCardType[]>([]);

  const axiosHandler = () => {
    console.log(situation, target, colors);
    axios
      .post(`https://flower-ly.co.kr/api/flly`, {
        "situation" : [situation == "선택 안함"? null : situation],
        "target" : [target == "선택 안함"? null : target],
        "colors": colors.includes("선택 안함")? null : colors
      })
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data.code === 200) {
          setFlowers(data.data.flowers);
          setFlowersColor(data.data.flowersColor);
          setFlowersMeaning(data.data.flowersMeaning);
          console.log("=== ",selected);
        }
        else console.log("오류 발생");
      });
  };

  const handleSelect = (e:flowerCardType) => {
    if(selected.includes(e.flowerCode)) {
      subValue(e);
    } else if(selected.length < 3) {
      addValue(e);
    }
  };

  const subValue = (value:flowerCardType) => {
    const updatedSelected = selected.filter(item => item != value.flowerCode);
    const updatedFlowers = selectedFlowers.filter(item => item !== value);
    setSelected(updatedSelected);
    setSelcetedFlowers(updatedFlowers);
    console.log(selected);
  }

  const addValue = (newValue:flowerCardType) => {
    console.log(selected);
    const updatedSelected = [...selected, newValue.flowerCode];
    const updatedFlowers = [...selectedFlowers, newValue];
    setSelected(updatedSelected);
    setSelcetedFlowers(updatedFlowers);
    console.log(selected);
  };

  useEffect(() => {
    selectedFlowers.map((value, index)=>{
      selected.push(value.flowerCode);
    })
    console.log(selectedFlowers);
    console.log("selected ", selected);
  },[])

  useEffect(() => {
    axiosHandler();
  },[])

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.contentBox}>
          <div className={style.headerTitle}>
            <div className={style.guide}>원하는 꽃을 선택해주세요.</div>
            <div className={style.guidePlus}>최대 3개까지 선택 가능합니다.</div>
          </div>
          <div className={style.selectAreaBox}>
            {flowers.length === 0? <div className={style.selectLoading}>꽃 목록을 로딩중입니다.</div> : 
              <div className={style.selectBox}>
                {flowers.map((item, index) => (
                  <div key={index} className={style.selectCard} onClick={() => {handleSelect(item)}}>
                    <div className={selected.includes(item.flowerCode)?`${style.selectImg} ${style.selectedImg}` : style.selectImg} style={{ backgroundImage: `url(${item.imageUrl})` }}>
                      {selected.includes(item.flowerCode) && <Image src="/img/icon/check.png" width={60} height={45} alt="체크"></Image>}
                    </div>
                    <div className={style.selectWord}>
                      <div className={style.flowerName}>{item.flowerName}</div>
                      <div className={style.flowerMeaning}>{item.meaning}</div>
                    </div>
                  </div>
                ))}
              </div>
            }
            {(flowersColor != null && flowersColor.length != 0) && 
              <div>
                <div className={style.sentence}>선택한 색의 꽃</div>
                <div className={style.selectBox}>
                  {flowersColor.map((item, index) => (
                    <div key={index} className={style.selectCard} onClick={() => {handleSelect(item)}}>
                      <div className={selected.includes(item.flowerCode)?`${style.selectImg} ${style.selectedImg}` : style.selectImg} style={{ backgroundImage: `url(${item.imageUrl})` }}>
                        {selected.includes(item.flowerCode) && <Image src="/img/icon/check.png" width={60} height={45} alt="체크"></Image>}
                      </div>
                      <div className={style.selectWord}>
                        <div className={style.flowerName}>{item.flowerName}</div>
                        <div className={style.flowerMeaning}>{item.meaning}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
            {(flowersMeaning != null && flowersMeaning.length != 0) && 
              <div>
                <div className={style.sentence}>선택한 상황과 대상의 꽃</div>
                <div className={style.selectBox}>
                  {flowersMeaning.map((item, index) => (
                    <div key={index} className={style.selectCard} onClick={() => {handleSelect(item)}}>
                      <div className={selected.includes(item.flowerCode)?`${style.selectImg} ${style.selectedImg}` : style.selectImg} style={{ backgroundImage: `url(${item.imageUrl})` }}>
                        {selected.includes(item.flowerCode) && <Image src="/img/icon/check.png" width={60} height={45} alt="체크"></Image>}
                      </div>
                      <div className={style.selectWord}>
                        <div className={style.flowerName}>{item.flowerName}</div>
                        <div className={style.flowerMeaning}>{item.meaning}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
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

export default FllyFlower;
