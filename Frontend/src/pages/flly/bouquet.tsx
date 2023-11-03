
import React, {useEffect} from "react";
import style from "@/components/flly/fllyUser/FllyBouquet.module.css";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { bouquetState, bouquetType } from "@/recoil/fllyRecoil";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const FllyBouquet = () => {
  const router = useRouter();
  const [check, setCheck] = useState<boolean>(false);
  const [selected, setSelected] = useState<bouquetType>();
  const [cnt, setCnt] = useState<number>(2);
  const bouquets = useRecoilValue(bouquetState);

  const handleSelect = (e:bouquetType) => {
    setSelected(e);
  };

  useEffect(() => {
    setCnt(3-(bouquets.length/4));
  }, []);

  useEffect(() => {
    if(bouquets.length != 0)setCheck(true);
    else setCheck(false);
  }, [bouquets]);

  const handleClick = () => {
    if(check) router.push("request");
  };

  const handleClickAgain = () => {
    if(cnt > 0) router.push("loading");
  };

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
                <div key={index} onClick={() => {handleSelect(item)}}>
                  <div className={selected == item?`${style.selectImg} ${style.selectedImg}` : style.selectImg} style={{ backgroundImage: `url(${item.url})` }}>
                    {(selected == item) && <Image src="/img/icon/check.png" width={60} height={45} alt="check"></Image>}
                  </div>
                </div>
              ))}
            </div>
            <div onClick={handleClickAgain} className={style.againBtn}><Image src="/img/icon/again.png" width={40} height={40} alt="again"></Image></div>
            <div className={style.btnCount}>남은 생성 횟수 : {cnt}/3</div>
          </div>
          <div className={style.btnBox}>
            <Link href="/flly/flower">
              <div className={style.prevBtn}>&lt;</div>
            </Link>
            <div onClick={handleClick} className={style.nextBtn}>다음</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyBouquet;
