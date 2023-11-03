import React, { useEffect } from "react";
import style from "@/components/flly/fllyUser/FllyRequest.module.css"
import { useState } from "react";
import { useRecoilState } from "recoil";
import { targetState } from "@/recoil/fllyRecoil";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const FllyTarget = () => {
  const router = useRouter();
  const [check, setCheck] = useState<boolean>(false);
  const [target, setTarget] = useRecoilState(targetState);
  const [selected, setSelected] = useState<string>("");
  const selectList = ["친구", "연인", "부모님", "가족", "선생님", "동료", "나", "선택 안함"];
  const imgList = ["/img/icon/target01.png", "/img/icon/target02.png", "/img/icon/target03.png", "/img/icon/target04.png", "/img/icon/target05.png", "/img/icon/target06.png", "/img/icon/target07.png", "/img/icon/target08.png"];
  const handleSelect = (e:string) => {
    setSelected(e);
    setTarget(e);
  };

  useEffect(() => {
    setSelected(target);
  }, [])

  useEffect(() => {
    if(target !== "") setCheck(true);
  }, [target])

  const handleClick = () => {
    if(check) router.push("color");
  };

  return (
    <>
      <div className={style.fllyBox}>
        <div className={style.contentBox}>
          <div className={style.headerTitle}>
            <div className={style.guide}>플리 의뢰서</div>
          </div>
          <div className={style.selectAreaBox}>
            <div className={style.selectBox}>
              {selectList.map((item, index) => (
                <div key={index} className={selected==item? style.selectedCard: style.selectCard} onClick={() => {handleSelect(item)}}>
                  <div className={style.selectWord}>{item}</div>
                  <Image src={imgList[index]} width={56} height={56} alt="아이콘" />
                </div>
              ))}            
            </div>

          </div>
          <div className={style.btnBox}>
            <Link href="/flly">
              <div className={style.prevBtn}>&lt;</div>
            </Link>
            <div onClick={handleClick} className={style.nextBtn}>다음</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyTarget;
