import React, {useEffect} from "react";
import style from "./FllyBouquet.module.css";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { bouquetState, bouquetType } from "@/recoil/fllyRecoil";

const FllyBouquet = () => {
  const [selected, setSelected] = useState<bouquetType>();
  const [cnt, setCnt] = useState<number>(2);
  const bouquets = useRecoilValue(bouquetState);

  const handleSelect = (e:bouquetType) => {
    setSelected(e);
  };

  useEffect(() => {
    setCnt(3-(bouquets.length/4));
  }, []);

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.contentBox}>
          <div className={style.headerTitle}>
            <div className={style.guide}>원하는 시안을 선택해주세요.</div>
          </div>
          <div className={style.selectAreaBox}>
            <div className={style.selectBox}>
              {bouquets.map((item, index) => (
                <div key={index} className={style.selectCard} onClick={() => {handleSelect(item)}}>
                  <div className={selected == item?`${style.selectImg} ${style.selectedImg}` : style.selectImg} style={{ backgroundImage: `url(${item.url})` }}>
                    {(selected == item) && <img src="/img/icon/check.png"></img>}
                  </div>
                </div>
              ))}
            </div>
            <div className={style.againBtn}><img src="/img/icon/again.png"></img></div>
            <div className={style.btnCount}>남은 생성 횟수 : {cnt}/3</div>
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

export default FllyBouquet;
