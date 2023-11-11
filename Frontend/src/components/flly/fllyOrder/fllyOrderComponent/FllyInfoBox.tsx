import React from "react";
import style from "./FllyInfoBox.module.css";
import Image from "next/image";

interface flowerType {
  flowerName: string;
  meaning: string;
}

interface resultSimpleType {
  fllyId: number;
  requestImgUrl: string | null;
  situation: string | null;
  target: string | null;
  color1: string | null;
  color2: string | null;
  color3: string | null;
  flower1: flowerType | null;
  flower2: flowerType | null;
  flower3: flowerType | null;
}

const FllyOrderBox = ({
  $requestInfo,
  $imgUrl,
}: {
  $requestInfo: resultSimpleType;
  $imgUrl: string | null | undefined;
}) => {
  return (
    <>
      <div className={style.fllyOrderBox}>
        <div>플리 정보</div>
        <div className={style.fllyOrderMain}>
          <div className={style.imgBox}>
            {$imgUrl != null ? (
              <Image src={$imgUrl} alt="테스트" width={150} height={150}></Image>
            ) : (
              <Image src="/img/etc/no-image.jpg" alt="테스트" width={150} height={150}></Image>
            )}
          </div>
          <div className={style.infoMainBox}>
            <div>
              <div>상황</div>
              <div>{$requestInfo.situation}</div>
            </div>
            <div>
              <div>대상</div>
              <div>{$requestInfo.target}</div>
            </div>
            <div>
              <div>색상</div>
              <div className={style.colorBox}>
                <div>{$requestInfo.color1}</div>
                <div>{$requestInfo.color2}</div>
                <div>{$requestInfo.color3}</div>
              </div>
            </div>
            <div>
              <div>선택한 꽃</div>
              <div className={style.flowerBox}>
                {$requestInfo.flower1 && <div>{$requestInfo.flower1.flowerName}</div>}
                {$requestInfo.flower2 && <div>{$requestInfo.flower2.flowerName}</div>}
                {$requestInfo.flower3 && <div>{$requestInfo.flower3.flowerName}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FllyOrderBox;
