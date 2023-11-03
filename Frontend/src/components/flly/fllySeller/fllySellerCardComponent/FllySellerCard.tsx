import React, { useEffect, useRef, useState } from "react";
import style from "./FllySellerCard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Picture from "next-export-optimize-images/picture";

interface FllyNearType {
  fllyId: number;
  flowerName1: string;
  flowerName2: string;
  flowerName3: string;
  imageUrl: string;
  progress: string;
  deadline: string;
  budget: number;
}

const FllySellerCard = ({ $FllyDeliveryNear }: { $FllyDeliveryNear: FllyNearType }) => {
  const [imageSrc, setImageSrc] = useState($FllyDeliveryNear.imageUrl);
  const rounter = useRouter();

  const errImageChangHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageSrc("/img/etc/no-image.jpg");
  };

  const pageMoveHandler = () => {
    rounter.push(
      {
        pathname: "/flly/detail/[fllyId]",
        query: { fllyId: $FllyDeliveryNear.fllyId },
      },
      "/flly/detail", // 이것은 브라우저 주소창에 표시될 URL입니다.
      { shallow: true },
    );
  };

  return (
    <>
      <div className={style.back}>
        <div className={style.cardMain}>
          <div className={style.cardMainImgBox}>
            <Image
              src={imageSrc}
              onError={errImageChangHandler}
              width={170}
              height={170}
              alt="이미지"
            ></Image>
            <div className={style.cardMainImgInfo}>{$FllyDeliveryNear.progress}중</div>
          </div>
          <div className={style.cardMainDetail}>
            <div>
              <Image src="/img/icon/seller-flower.png" alt="꽃" width={18} height={18}></Image>
              <span>
                {$FllyDeliveryNear.flowerName1}, {$FllyDeliveryNear.flowerName2},{" "}
                {$FllyDeliveryNear.flowerName3}
              </span>
            </div>
            <div>
              <Image src="/img/icon/seller-money.png" alt="돈" width={18} height={18}></Image>
              <span>{$FllyDeliveryNear.budget} 원</span>
            </div>
            <div>
              <Image src="/img/icon/seller-time.png" alt="마감" width={18} height={18}></Image>
              <span>~ {$FllyDeliveryNear.deadline}</span>
            </div>
            <div>
              <button onClick={pageMoveHandler}>참여하기</button>
            </div>
          </div>
        </div>
        <div className={style.cardfooter}>자세히 보기</div>
      </div>
    </>
  );
};

export default FllySellerCard;
