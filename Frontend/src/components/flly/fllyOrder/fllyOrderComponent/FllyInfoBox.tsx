import React from "react";
import style from "./FllyInfoBox.module.css";
import Image from "next/image";

const FllyOrderBox = () => {
  return (
    <>
      <div className={style.fllyOrderBox}>
        <div>플리 정보</div>
        <div className={style.fllyOrderMain}>
          <div className={style.imgBox}>
            <Image src="/test/test-flower-img.png" alt="테스트" width={150} height={150}></Image>
          </div>
          <div className={style.infoMainBox}>
            <div>
              <div>상황</div>
              <div>사랑</div>
            </div>
            <div>
              <div>대상</div>
              <div>연인</div>
            </div>
            <div>
              <div>색상</div>
              <div className={style.colorBox}>
                <div>분홍</div>
                <div>파랑</div>
              </div>
            </div>
            <div>
              <div>선택한 꽃</div>
              <div className={style.flowerBox}>
                <div>분홍 수국</div>
                <div>파랑 수국</div>
                <div>보라 수국</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyOrderBox;
