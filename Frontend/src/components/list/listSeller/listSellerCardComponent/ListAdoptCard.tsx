import React, { useEffect, useState } from "react";
import style from "./ListAdoptCard.module.css";
import Image from "next/image";

interface adoptType {
  requestId: number;
  orderName: string;
  phoneNumber: string;
  orderType: string;
  deliveryPickupTime: string;
  fllyId: number;
  progress: string;
  imageUrl: string;
}

interface Props {
  ModalChangeHandler: () => void;
  $adoptInfo: adoptType;
  SelectIdChangeHandler: (fllyId: number, index: number) => void;
  $index: number;
}

const ListAdoptCard = ({
  ModalChangeHandler,
  SelectIdChangeHandler,
  $adoptInfo,
  $index,
}: Props) => {
  const flowerSrc = "/img/icon/flower-bouquet.png";
  const paperSrc = "/img/icon/paper-plane.png";

  const btnClickHandler = () => {
    SelectIdChangeHandler($adoptInfo.fllyId, $index);
    ModalChangeHandler();
  };

  const [progressState, setProgressState] = useState<string>();
  const [progressImg, setProgressImg] = useState<string>("/img/icon/flower-bouquet.png");

  useEffect(() => {
    if ($adoptInfo.progress === "주문완료") {
      setProgressState("제작중");
      setProgressImg(flowerSrc);
    }
    if ($adoptInfo.progress === "제작완료") {
      setProgressState("배송중");
      setProgressImg(paperSrc);
    }
  }, [$adoptInfo.progress]);

  return (
    <>
      {$adoptInfo.progress !== "픽업/배달완료" ? (
        <div className={style.cardBack}>
          <div className={style.cardHeader}>
            <div className={style.cardHeaderImg}>
              <div style={{ backgroundImage: `url(${$adoptInfo.imageUrl})` }} />
            </div>
            <div className={style.cardHeaderInfoBox}>
              <div className={style.cardHeaderInfo}>
                <div>
                  <Image src="/img/icon/seller-user.png" width={18} height={18} alt="상태이미지" />
                  <div>{$adoptInfo.orderName}</div>
                </div>
                <div>
                  <Image src="/img/icon/seller-phon.png" width={18} height={18} alt="상태이미지" />
                  <div>{$adoptInfo.phoneNumber}</div>
                </div>
                <div>
                  <Image
                    src="/img/icon/seller-forward.png"
                    width={18}
                    height={18}
                    alt="상태이미지"
                  />
                  <div>{$adoptInfo.orderType}</div>
                </div>
                <div>
                  <Image src="/img/icon/seller-time.png" width={18} height={18} alt="상태이미지" />
                  <div>{$adoptInfo.deliveryPickupTime}</div>
                </div>
              </div>
              <div>
                <div className={style.moveBtnBox}>
                  주문서 보기<span> &gt;</span>
                </div>
              </div>
            </div>
          </div>
          <div className={style.cardMain}>
            <div className={style.cardMainState}>
              <Image src={progressImg} width={16} height={16} alt="상태이미지"></Image>
              <span>{progressState}</span>
            </div>
            <div className={style.cardFinshBtn} onClick={btnClickHandler}>
              완료하기
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ListAdoptCard;
