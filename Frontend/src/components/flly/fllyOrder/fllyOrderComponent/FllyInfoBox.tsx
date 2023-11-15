import React from "react";
import style from "./FllyInfoBox.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const movePageHandelr = () => {
    router.push(
      {
        pathname: "/flly/order/detail/[fllyId]",
        query: { fllyId: $requestInfo.fllyId },
      },
      "/flly/order/detail", // 이것은 브라우저 주소창에 표시될 URL입니다.
      { shallow: true },
    );
  };

  return (
    <>
      <div className={style.fllyOrderBox}>
        <div>
          <div>플리 정보</div>
          <div className={style.fllyInfoBtn} onClick={movePageHandelr}>
            의뢰 정보 상세 보기 <span>&gt;</span>
          </div>
        </div>
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
                {$requestInfo.color1 && <div>{$requestInfo.color1}</div>}
                {$requestInfo.color2 && <div>{$requestInfo.color2}</div>}
                {$requestInfo.color3 && <div>{$requestInfo.color3}</div>}
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
